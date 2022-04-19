import {
  ICreatePromise,
  IDeletePromise,
  IItem,
  IList,
  IListPromise,
  IReadPromise,
  IUpdatePromise
} from '@/services/base/global.interfaces';
import {
  compileListQueryParameters,
  getBaseUrl,
  mergeHeaders,
  processStandardItemResponse,
  processStandardListResponse
} from '@/services/base/base';
import {RouteConfig} from 'vue-router';
import {formatString} from '@/plugins/vuetify';

export const baseList = <T>(entity: string): IListPromise<T> => {
  return (
    order: string,
    filters: object = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<IList<T>> => {
    return new Promise<IList<T>>((resolve, reject) => {
      fetch(`${getBaseUrl()}/${entity}${compileListQueryParameters(order, filters)}`, {

        method: 'GET',
        headers: mergeHeaders({
          'Page-Size': pageSize,
          'Page-Index': pageIndex,
        }),

      }).then((response) => {

        processStandardListResponse<T>(response, resolve, reject);

      }).catch((reason) => {

        reject(reason);

      });
    });
  };
};

export const baseCreate = <T>(entity: string): ICreatePromise<T> => {
  return (
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return fetch(`${getBaseUrl()}/${entity}`, {

        method: 'POST',
        body: JSON.stringify(document),
        headers: mergeHeaders({}),

      }).then((response) => {

        processStandardItemResponse<T>(response, resolve, reject);

      }).catch((reason) => {

        reject(reason);

      });
    });
  };
};

export const baseRead = <T>(entity: string): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return fetch(`${getBaseUrl()}/${entity}/${id}`, {
        method: 'GET',
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardItemResponse<T>(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

export const baseUpdate = <T>(entity: string): IUpdatePromise<T> => {
  return (
    id: string,
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return fetch(`${getBaseUrl()}/${entity}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(document),
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardItemResponse<T>(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

export const baseDelete = <T>(entity: string): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return fetch(`${getBaseUrl()}/${entity}/${id}`, {
        method: 'DELETE',
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardItemResponse<T>(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

const generateRepositoryCrudRoutes = (repository: any): RouteConfig[] => {
  const plural = formatString(repository.title.plural);
  const singular = formatString(repository.title.singular);
  const titleList = formatString('custom.entity.list', plural);
  const titleNew = formatString('custom.entity.new', singular);
  const titleEdit = formatString('custom.entity.edit', singular);
  const titleView = formatString('custom.entity.view', singular);
  return [
    {
      path: `${repository.listPage}`,
      name: `${repository.entity}-list`,
      component: () => import('@/views/EntityList.vue'),
      meta: {
        repository: repository,
        title: titleList,
      }
    },
    {
      path: `${repository.viewPagePrefix}/:id`,
      name: `${repository.entity}-view`,
      component: () => import('@/views/EntityView.vue'),
      meta: {
        repository: repository,
        title: titleView,
      }
    },
    {
      path: `${repository.addPage}`,
      name: `${repository.entity}-new`,
      component: () => import('@/views/EntityEdit.vue'),
      meta: {
        repository: repository,
        title: titleNew,
      }
    },
    {
      path: `${repository.editPagePrefix}/:id`,
      name: `${repository.entity}-edit`,
      component: () => import('@/views/EntityEdit.vue'),
      meta: {
        repository: repository,
        title: titleEdit,
      }
    },
  ];
}

export const generateCrudRoutes = (...repositories: any[]): RouteConfig[] => {
  const routes: RouteConfig[] = [];
  repositories.forEach((repository) => {
    routes.push(...generateRepositoryCrudRoutes(repository));
  });
  return routes;
}
