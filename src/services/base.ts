import {bus} from './bus';
import {auth} from './auth';
import {toastError, toastSuccess} from '@/plugins/vuetify';

interface IListResponse {
  status: number;
  headers: Headers;
  items: any[];
}

interface IItemResponse {
  status: number;
  headers: Headers;
  item: any;
}

let baseUrl = '/api';

export const getBaseUrl = (): string => {
  return baseUrl;
};

export const setBaseUrl = (
  url: string,
): void => {
  baseUrl = url.replace(/\/+$/, ''); // rtrim('/')
  baseUrl = baseUrl.replace(/\\+$/, ''); // rtrim('\')
};

export const compileListQueryParameters = (
  order: string,
  filters: any,
): string => {
  const parts = [];

  if (order) {
    parts.push(`-order=${encodeURI(order)}`);
  }

  if (filters != null) {
    Object.keys(filters).forEach((k) => {
      parts.push(`${k}=${filters[k]}`);
    });
  }

  if (parts.length <= 0) {
    return '';
  }

  return `?${parts.join('&')}`;
};

export const mergeHeaders = (
  headers: any,
): Headers => {
  const response = new Headers();

  let hasContentType = false;
  let hasAuthorization = false;

  if (headers != null) {
    Object.keys(headers).forEach((k) => {
      if (k.toLowerCase() === 'content-type') {
        hasContentType = true;
      }
      if (k.toLowerCase() === 'authorization') {
        hasAuthorization = true;
      }
      response.append(k, headers[k]);
    });
  }

  if (!hasContentType) {
    response.append('Content-Type', 'application/json');
  }
  if (!hasAuthorization) {
    const token = auth.getToken();
    if (token !== null && token !== '') {
      response.append('Authorization', `Bearer ${token}`);
    }
  }

  return response;
};

export const processStandardResponse = (
  response: Response,
  resolve: any,
  reject: any,
): void => {

  if (response.status !== 200) {
    const message = response.headers.get('Message') ?? 'Something went wrong.';
    toastError(message);

    if (response.status === 401) {
      window.location.assign('/login');
      return;
    }

    if (response.status === 400) {
      response.json().then((body) => {

        bus.publish('validation.errors', body);
        reject(message);

      });
      return;
    }

    reject(message);
    return;
  }

  response.json().then((body) => {

    const message = response.headers.get('Message') ?? '';
    if (message !== '') {
      toastSuccess(message);
    }
    resolve(body);

  });

};

export const baseTableHeaders = (repository: any): any[] => {
  const response: any[] = [];
  repository.headers.forEach((header: any) => {
    if (!header.label && header.field) {
      header.label = repository.fields[header.field].label;
    }
    response.push({
      text: header.label ?? 'Unknown',
      align: header.align ?? 'start',
      sortable: header.sortable ?? (!!header.field),
      value: header.field,
    });
  });
  return response;
};

interface IListPromise<T> {
  (
    order: string,
    filters: any,
    pageIndex: number,
    pageSize: number,
  ): Promise<T>;
}

export const baseList = <T>(entity: string): IListPromise<T> => {
  return (
    order: string,
    filters: any = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      fetch(`${baseUrl}/${entity}${compileListQueryParameters(order, filters)}`, {

        method: 'GET',
        headers: mergeHeaders({
          'Page-Size': pageSize,
          'Page-Index': pageIndex,
        }),

      }).then((response) => {

        processStandardResponse(response, resolve, reject);

      }).catch((reason) => {

        reject(reason);

      });
    });
  };
};

interface ICreatePromise<T> {
  (
    document: any,
  ): Promise<T>;
}

export const baseCreate = <T>(entity: string): ICreatePromise<T> => {
  return (
    document: any,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return fetch(`${baseUrl}/${entity}`, {
        method: 'POST',
        body: JSON.stringify(document),
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardResponse(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

interface IReadPromise<T> {
  (
    id: string,
  ): Promise<T>;
}

export const baseRead = <T>(entity: string): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return fetch(`${baseUrl}/${entity}/${id}`, {
        method: 'GET',
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardResponse(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

interface IUpdatePromise<T> {
  (
    id: string,
    document: any,
  ): Promise<T>;
}

export const baseUpdate = <T>(entity: string): IUpdatePromise<T> => {
  return (
    id: string,
    document: any,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return fetch(`${baseUrl}/${entity}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(document),
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardResponse(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

interface IDeletePromise<T> {
  (
    id: string,
  ): Promise<T>;
}

export const baseDelete = <T>(entity: string): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return fetch(`${baseUrl}/${entity}/${id}`, {
        method: 'DELETE',
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardResponse(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

interface IBulkPromise<T> {
  (
    action: string,
    ids: string[]
  ): Promise<T>;
}

export const baseBulk = <T>(entity: string): IBulkPromise<T> => {
  return (
    action: string,
    ids: string[]
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return fetch(`${baseUrl}/${entity}/bulk`, {
        method: 'POST',
        body: JSON.stringify({
          action: action,
          ids: ids,
        }),
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardResponse(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};

// a custom against executed on an entity list level and returns a list response
export const baseEntityActionListResponse = (
  entity: string,
  action: string,
  payload: any = {},
  headers: any = {},
): Promise<IListResponse> => {
  return new Promise<IListResponse>((resolve, reject) => {
    return fetch(`${baseUrl}/${entity}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardResponse(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

// a custom against executed on an entity list level and returns a single item response
export const baseEntityActionItemResponse = (
  entity: string,
  action: string,
  payload: any = {},
  headers: any = {},
): Promise<IItemResponse> => {
  return new Promise<IItemResponse>((resolve, reject) => {
    return fetch(`${baseUrl}/${entity}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardResponse(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

// a custom against executed against a single entity record level and returns a list response
export const baseRecordActionListResponse = (
  entity: string,
  action: string,
  id: string,
  payload: any = {},
  headers: any = {},
): Promise<IListResponse> => {
  return new Promise<IListResponse>((resolve, reject) => {
    return fetch(`${baseUrl}/${entity}/${id}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardResponse(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};

// a custom against executed on an entity list level and returns a single item response
export const baseRecordActionItemResponse = (
  entity: string,
  action: string,
  id: string,
  payload: any = {},
  headers: any = {},
): Promise<IItemResponse> => {
  return new Promise<IItemResponse>((resolve, reject) => {
    return fetch(`${baseUrl}/${entity}/${id}/actions/${action}`, {

      method: 'POST',
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),

    }).then((response) => {

      processStandardResponse(response, resolve, reject);

    }).catch((reason) => {

      reject(reason);

    });
  });
};


export const baseListStub = <T>(entity: string, response: T): IListPromise<T> => {
  return (
    order: string,
    filters: any = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      console.log('list', entity, order, filters, pageIndex, pageSize);
      resolve(response);
    });
  };
};

export const baseCreateStub = <T>(entity: string, response: T): ICreatePromise<T> => {
  return (
    document: any,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      console.log('create', entity, document);
      resolve(response);
    });
  };
};

export const baseReadStub = <T>(entity: string, response: T): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      console.log('read', entity, id);
      resolve(response);
    });
  };
};

export const baseUpdateStub = <T>(entity: string, response: T): IUpdatePromise<T> => {
  return (
    id: string,
    document: any,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      console.log('update', entity, id, document);
      resolve(response);
    });
  };
};

export const baseDeleteStub = <T>(entity: string, list: any[], response: T): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      list.pop();
      console.log('delete', entity, id);
      resolve(response);
    });
  };
};

export const baseBulkStub = <T>(entity: string, response: T): IBulkPromise<T> => {
  return (
    action: string,
    ids: string[],
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      console.log('bulk', entity, action, ids);
      resolve(response);
    });
  };
};
