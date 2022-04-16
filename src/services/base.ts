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
    entity: string,
    order: string,
    filters: any,
    pageIndex: number,
    pageSize: number,
  ): Promise<T>;
}

export const baseList = <T>(): IListPromise<T> => {
  return (
    entity: string,
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
    entity: string,
    document: any,
  ): Promise<T>;
}

export const baseCreate = <T>(): ICreatePromise<T> => {
  return (
    entity: string,
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
    entity: string,
    id: string,
  ): Promise<T>;
}

export const baseRead = <T>(): IReadPromise<T> => {
  return (
    entity: string,
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
    entity: string,
    id: string,
    document: any,
  ): Promise<T>;
}

export const baseUpdate = <T>(): IUpdatePromise<T> => {
  return (
    entity: string,
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
    entity: string,
    id: string,
  ): Promise<T>;
}

export const baseDelete = <T>(): IDeletePromise<T> => {
  return (
    entity: string,
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


export const baseListStub = <T>(response: T): IListPromise<T> => {
  return (
    entity: string,
    order: string,
    filters: any = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      alert(`list`);
      resolve(response);
    });
  };
};

export const baseCreateStub = <T>(response: T): ICreatePromise<T> => {
  return (
    entity: string,
    document: any,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      alert(`create`);
      resolve(response);
    });
  };
};

export const baseReadStub = <T>(response: T): IReadPromise<T> => {
  return (
    entity: string,
    id: string,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      alert(`read`);
      resolve(response);
    });
  };
};

export const baseUpdateStub = <T>(response: T): IUpdatePromise<T> => {
  return (
    entity: string,
    id: string,
    document: any,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      alert(`update`);
      resolve(response);
    });
  };
};

export const baseDeleteStub = <T>(list: any[], response: T): IDeletePromise<T> => {
  return (
    entity: string,
    id: string,
  ): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      list.pop();
      alert(`delete`);
      resolve(response);
    });
  };
};
