// a custom against executed on an entity list level and returns a list response
import {IItem, IList} from '@/services/base/global.interfaces';
import {
  apiFetch,
  getBaseUrl,
  mergeHeaders,
  processStandardItemResponse,
  processStandardListResponse
} from '@/services/base/base';

export const baseEntityActionListResponse = <T>(
  entity: string,
  action: string,
  payload: object | object[] | null = {},
  headers: Headers = new Headers(),
): Promise<IList<T>> => {
  return new Promise<IList<T>>((resolve, reject) => {
    return apiFetch(`${getBaseUrl()}/${entity}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardListResponse<T>(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

// a custom against executed on an entity list level and returns a single item response
export const baseEntityActionItemResponse = <T>(
  entity: string,
  action: string,
  payload: object | object[] | null = {},
  headers: Headers = new Headers(),
): Promise<IItem<T>> => {
  return new Promise<IItem<T>>((resolve, reject) => {
    return apiFetch(`${getBaseUrl()}/${entity}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardItemResponse<T>(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

// a custom against executed against a single entity record level and returns a list response
export const baseRecordActionListResponse = <T>(
  entity: string,
  action: string,
  id: string,
  payload: object | object[] | null = {},
  headers: Headers = new Headers(),
): Promise<IList<T>> => {
  return new Promise<IList<T>>((resolve, reject) => {
    return apiFetch(`${getBaseUrl()}/${entity}/${id}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardListResponse<T>(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

// a custom against executed on an entity list level and returns a single item response
export const baseRecordActionItemResponse = <T>(
  entity: string,
  action: string,
  id: string,
  payload: object | object[] | null = {},
  headers: Headers = new Headers(),
): Promise<IItem<T>> => {
  return new Promise<IItem<T>>((resolve, reject) => {
    return apiFetch(`${getBaseUrl()}/${entity}/${id}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardItemResponse<T>(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

