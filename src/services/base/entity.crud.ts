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
