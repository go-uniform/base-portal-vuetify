import {
  ICreatePromise,
  IDeletePromise,
  IItem,
  IList,
  IListPromise,
  IReadPromise, IRepository,
  IUpdatePromise
} from '@/services/base/global.interfaces';
import {
  apiFetch,
  compileListQueryParameters,
  getBaseUrl,
  mergeHeaders,
  processStandardItemResponse,
  processStandardListResponse
} from '@/services/base/base';
import {RouteConfig} from 'vue-router';
import {translate} from '@/plugins/base/vuetify';

export const baseList = <T>(slug: string): IListPromise<T> => {
  return (
    order: string,
    filters: object = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<IList<T>> => {
    return new Promise<IList<T>>((resolve, reject) => {
      apiFetch(`${getBaseUrl()}/${slug}${compileListQueryParameters(order, filters)}`, {

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

export const baseCreate = <T>(slug: string): ICreatePromise<T> => {
  return (
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return apiFetch(`${getBaseUrl()}/${slug}`, {

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

export const baseRead = <T>(slug: string): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return apiFetch(`${getBaseUrl()}/${slug}/${id}`, {
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

export const baseUpdate = <T>(slug: string): IUpdatePromise<T> => {
  return (
    id: string,
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return apiFetch(`${getBaseUrl()}/${slug}/${id}`, {
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

export const baseDelete = <T>(slug: string): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      return apiFetch(`${getBaseUrl()}/${slug}/${id}`, {
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

export const createRepositoryCrudRoutes = (routes: RouteConfig[], repository: any): RouteConfig[] => {
  const plural = translate(repository.title.plural);
  const singular = translate(repository.title.singular);
  const titleList = translate('$vuetify.entity.list', plural);
  const titleNew = translate('$vuetify.entity.new', singular);
  const titleEdit = translate('$vuetify.entity.edit', singular);
  const titleView = translate('$vuetify.entity.view', singular);

  routes.push(...[
    {
      path: `${repository.listPage}`,
      name: `${repository.entity}-list`,
      component: () => import('@/views/base/EntityList.vue'),
      meta: {
        repository: repository,
        title: titleList,
      }
    },
    {
      path: `${repository.viewPagePrefix}/:id`,
      name: `${repository.entity}-view`,
      component: () => import('@/views/base/EntityView.vue'),
      meta: {
        repository: repository,
        title: titleView,
      }
    },
    {
      path: `${repository.addPage}`,
      name: `${repository.entity}-new`,
      component: () => import('@/views/base/EntityEdit.vue'),
      meta: {
        repository: repository,
        title: titleNew,
      }
    },
    {
      path: `${repository.editPagePrefix}/:id`,
      name: `${repository.entity}-edit`,
      component: () => import('@/views/base/EntityEdit.vue'),
      meta: {
        repository: repository,
        title: titleEdit,
      }
    },
  ]);

  return routes;
}

export const createMenuItem = <T>(repository: IRepository<T>): object => {
  return {
    title: translate(repository.title.plural),
    location: repository.listPage,
  };
}
