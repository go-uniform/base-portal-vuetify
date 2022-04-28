import {bus} from './bus';
import {auth} from './auth';
import {toastError, toastSuccess, translate} from '@/plugins/base/vuetify';
import {IStubScenario} from './stub';
import {
  IErrorResponse,
  IGeneric, IHeaderCustom,
  IHeaderLinked,
  IItem,
  IItemResponse,
  IList,
  IListResponse,
  IRepository,
  IResponse
} from './global.interfaces';
import {EnumHeaderAlign, EnumHttpMethod} from '@/services/base/global.enums';
import {generic} from '@/services/base/global.types';

interface ApiFetchHandler {
  (input: RequestInfo, init?: RequestInit): Promise<Response>
}

let baseUrl = '/api';
let apiFetchHandler: ApiFetchHandler | null = null;

export const getBaseUrl = (): string => {
  return baseUrl;
};

export const setBaseUrl = (
  url: string,
): void => {
  baseUrl = url.replace(/\/+$/, ''); // rtrim('/')
  baseUrl = baseUrl.replace(/\\+$/, ''); // rtrim('\')
};

export const getApiFetchHandler = (): ApiFetchHandler | null => {
  return apiFetchHandler;
}

export const setApiFetchHandler = (handler: ApiFetchHandler | null) => {
  return apiFetchHandler = handler;
}

export const apiFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  if (apiFetchHandler !== null) {
    return apiFetchHandler(input, init);
  }
  return fetch(input, init);
}

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

export const processStandardResponse = <T>(
  list: boolean,
  response: Response | IStubScenario,
  resolve: IResponse<T>,
  reject: IErrorResponse,
): void => {

  if (response.status !== 200) {
    let generalErrorMessage = '$vuetify.errors.general';
    if (response.status === 404) {
      generalErrorMessage = '$vuetify.errors.recordNotFound';
    }
    const message = response.headers.get('Message') ?? translate(generalErrorMessage);
    const messageArguments = response.headers.get('Message-Arguments') ?? '';
    toastError(message, ...messageArguments.split('###'));

    if (response.status === 401) {
      window.location.assign('/login');
      return;
    }

    if (response.status === 400) {
      response.json().then((body) => {

        bus.publish('validation.errors', body);
        reject({
          status: response.status,
          headers: response.headers,
          message: message,
          body: body,
        });

      });
      return;
    }

    reject({
      status: response.status,
      headers: response.headers,
      message: message,
      body: null,
    });
    return;
  }

  response.json().then((body) => {

    const message = response.headers.get('Message') ?? '';
    if (message !== '') {
      const messageArguments = response.headers.get('Message-Arguments') ?? '';
      toastSuccess(message, ...messageArguments.split('###'));
    }

    let value: IGeneric<T>;
    if (list) {
      value = {
        status: response.status,
        headers: response.headers,
        items: body,
      };
    } else {
      value = {
        status: response.status,
        headers: response.headers,
        item: body,
      };
    }

    resolve(value);

  });

};

export const baseRestItem = <T>(callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IItem<T>> => {
  return new Promise<IItem<T>>((resolve, reject) => {
    apiFetch(`${getBaseUrl()}/${path}`, {
      method: method,
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),
    }).then((response) => {
      const wrapperResolve = (value: IItem<T>) => {
        if (callbackResolve) {
          if (!callbackResolve(value)) {
            reject('failed callback');
          }
        }
        resolve(value);
      };
      const wrapperReject = (reason?: any) => {
        if (callbackReject) {
          callbackReject(reason);
        }
        reject(reason);
      };
      processStandardItemResponse<T>(response, wrapperResolve, wrapperReject);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const baseRestList = <T>(callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IList<T>> => {
  return new Promise<IList<T>>((resolve, reject) => {
    apiFetch(`${getBaseUrl()}/${path}`, {
      method: method,
      body: JSON.stringify(payload),
      headers: mergeHeaders(headers),
    }).then((response) => {
      const wrapperResolve = (value: IList<T>) => {
        if (callbackResolve) {
          if (!callbackResolve(value)) {
            reject('failed callback');
          }
        }
        resolve(value);
      };
      const wrapperReject = (reason?: any) => {
        if (callbackReject) {
          callbackReject(reason);
        }
        reject(reason);
      };
      processStandardListResponse<T>(response, wrapperResolve, wrapperReject);
    }).catch((reason) => {
      reject(reason);
    });
  });
};

export const processStandardItemResponse = <T>(
  response: Response | IStubScenario,
  resolve: IItemResponse<T>,
  reject: IErrorResponse,
): void => {
  processStandardResponse<T>(false, response, (value) => {
    resolve({
      status: value.status,
      headers: value.headers,
      item: (value as IItem<T>).item,
    });
  }, reject);
};

export const processStandardListResponse = <T>(
  response: Response | IStubScenario,
  resolve: IListResponse<T>,
  reject: IErrorResponse,
): void => {
  processStandardResponse<T>(true, response, (value) => {
    resolve({
      status: value.status,
      headers: value.headers,
      items: (value as IList<T>).items,
    });
  }, reject);
};

export const baseTableHeaders = (repository: IRepository<any>): object[] => {
  const response: object[] = [];
  if (repository.headers) {
    repository.headers.forEach((header) => {
      let displayText = null;
      let displayCallback = null;
      let value = null;
      const linkedHeader = (header as IHeaderLinked);
      if (linkedHeader && linkedHeader.fieldKey) {
        value = linkedHeader.fieldKey;
        if (!header.title) {
          header.title = repository.fields[linkedHeader.fieldKey].label;
        }
      } else {
        const customHeader = (header as IHeaderCustom);
        displayText = customHeader.displayText;
        displayCallback = customHeader.displayCallback;
      }
      response.push({
        text: translate(header.title) ?? 'Unknown',
        align: header.align ?? EnumHeaderAlign.Start,
        sortable: header.sortable ?? (!!value),
        filterable: header.filterable ?? false,
        class: header.class,
        value: value,
        displayText: displayText,
        displayCallback: displayCallback,
      });
    });
  }
  return response;
};
