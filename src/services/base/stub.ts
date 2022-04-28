import {
  IBulkPromise,
  ICreatePromise,
  IDeletePromise,
  IItem,
  IList,
  IListPromise,
  IReadPromise,
  IUpdatePromise
} from './global.interfaces';
import {
  compileListQueryParameters, getBaseUrl,
  processStandardItemResponse,
  processStandardListResponse
} from '@/services/base/base';
import {generic} from '@/services/base/global.types';
import {EnumHttpMethod} from '@/services/base/global.enums';

const StubTimeout = 500;

export const generateUuid = () => {
  let d = performance.now();
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16;
    if(d > 0){
      r = (d + r)%16 | 0;
      d = Math.floor(d/16);
    } else {
      r = (d2 + r)%16 | 0;
      d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export interface IStubScenario {
  status: number;
  headers: Headers;

  json(): Promise<any>;
}

const generateJsonPromise = (body: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    resolve(body);
  });
};

export const stubScenario = (body: any, status = 200, headers: Headers = new Headers()): IStubScenario => {
  return {
    status: status,
    headers: headers,
    json: (): Promise<any> => {
      return generateJsonPromise(body);
    },
  };
};

export const baseRestItemStub = <T>(slug: string, handler: any): IResponse => {
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('rest-item', slug, input, init);
        handler(input, init, resolve, reject);
      }, StubTimeout);
    });
  };
};

export const baseRestListStub = <T>(slug: string, handler: any): IResponse => {
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('rest-list', slug, input, init);
        handler(input, init, resolve, reject);
      }, StubTimeout);
    });
  };
};

interface IResponse {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
}

export const baseListStub = <T>(slug: string, scenario?: IStubScenario | null): IResponse => {
  return (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('list', slug, input, init);
        if (scenario) {
          resolve(scenario);
        } else {
          let list = [];
          if (window.localStorage) {
            const data = window.localStorage.getItem(`stub.${slug}`);
            if (data) {
              list = JSON.parse(data);
            }
          }
          resolve(stubScenario(list, 200));
        }
      }, StubTimeout);
    });
  };
};

export type IStubCreateHandler = (item: any) => any;

export const baseCreateStub = <T>(list: T[], scenario: IStubScenario | IStubCreateHandler | null, entity: string): ICreatePromise<T> => {
  return (
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      setTimeout(() => {
        console.log('create', entity, document);
        const hardcodedScenario = (scenario as IStubScenario);
        if (hardcodedScenario && hardcodedScenario.status) {
          processStandardItemResponse<T>(hardcodedScenario, resolve, reject);
        } else {
          const handler = (scenario as IStubCreateHandler);
          const record: any = document;
          record.id = generateUuid();
          record.modifiedAt = new Date();
          record.createdAt = new Date();
          if (handler) {
            list.push(handler(record));
          } else {
            list.push(record);
          }
          if (window.localStorage) {
            window.localStorage.setItem(`stub.${entity}`, JSON.stringify(list));
          }
          processStandardItemResponse<T>(stubScenario(record, 200), resolve, reject);
        }
      }, StubTimeout);
    });
  };
};

export const baseReadStub = <T>(list: T[], scenario: IStubScenario | null, entity: string): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      setTimeout(() => {
        console.log('read', entity, id);
        if (scenario) {
          processStandardItemResponse<T>(scenario, resolve, reject);
        } else {
          const index = list.findIndex((item: any) => {
            return item.id === id
          });
          if (index === -1) {
            processStandardItemResponse<T>(stubScenario(null, 404), resolve, reject);
          } else {
            processStandardItemResponse<T>(stubScenario(list[index], 200), resolve, reject);
          }
        }
      }, StubTimeout);
    });
  };
};

export const baseUpdateStub = <T>(list: T[], scenario: IStubScenario | IStubCreateHandler | null, entity: string): IUpdatePromise<T> => {
  return (
    id: string,
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      setTimeout(() => {
        console.log('update', entity, id, document);
        const hardcodedScenario = (scenario as IStubScenario);
        if (hardcodedScenario && hardcodedScenario.status) {
          processStandardItemResponse<T>(hardcodedScenario, resolve, reject);
        } else {
          const index = list.findIndex((item: any) => {
            return item.id === id
          });
          if (index === -1) {
            processStandardItemResponse<T>(stubScenario(null, 404), resolve, reject);
          } else {
            const handler = (scenario as IStubCreateHandler);
            const record: any = {
              ...list[index],
              ...document
            };
            record.modifiedAt = new Date();
            if (handler) {
              list[index] = handler(record);
            } else {
              list[index] = record;
            }
            if (window.localStorage) {
              window.localStorage.setItem(`stub.${entity}`, JSON.stringify(list));
            }
            processStandardItemResponse<T>(stubScenario(record, 200), resolve, reject);
          }
        }
      }, StubTimeout);
    });
  };
};

export const baseDeleteStub = <T>(list: T[], scenario: IStubScenario | null, entity: string): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      setTimeout(() => {
        console.log('delete', entity, id);
        const hardcodedScenario = (scenario as IStubScenario);
        if (hardcodedScenario && hardcodedScenario.status) {
          processStandardItemResponse<T>(hardcodedScenario, resolve, reject);
        } else {
          const index = list.findIndex((item: any) => {
            return item.id === id
          });
          if (index === -1) {
            processStandardItemResponse<T>(stubScenario(null, 404), resolve, reject);
          } else {
            const record = list[index];
            list.splice(index, 1);
            if (window.localStorage) {
              window.localStorage.setItem(`stub.${entity}`, JSON.stringify(list));
            }
            processStandardItemResponse<T>(stubScenario(record, 200), resolve, reject);
          }
        }
      }, StubTimeout);
    });
  };
};

export const baseBulkStub = <T>(list: T[], scenario: IStubScenario | null, entity: string): IBulkPromise => {
  return (
    action: string,
    ids: string[],
  ): Promise<IItem<generic>> => {
    return new Promise<IItem<generic>>((resolve, reject) => {
      setTimeout(() => {
        console.log('bulk', entity, action, ids);
        if (scenario) {
          processStandardItemResponse<generic>(scenario, resolve, reject);
        }
      }, StubTimeout);
    });
  };
};

export const baseListLoad = <T>(list: T[], entity: string): T[] => {
  if (window.localStorage) {
    const data = window.localStorage.getItem(`stub.${entity}`);
    if (data) {
      const items = JSON.parse(data);
      if (items) {
        return items;
      }
    }
    window.localStorage.setItem(`stub.${entity}`, JSON.stringify(list));
  }
  return list;
}

export const generateFakeJwt = (claims: any): string => {
  const header = {
    "alg": "HS256",
    "typ": "JWT",
  }
  const encodedHeaders = btoa(JSON.stringify(header))

  if (!claims) {
    claims = {
      "iat": Math.round((new Date()).getTime() / 1000),
    }
  } else {
    claims.iat = Math.round((new Date()).getTime() / 1000);
  }
  const encodedPayload = btoa(JSON.stringify(claims))

  const signature = 'fake';
  const encodedSignature = btoa(signature)

  return `${encodedHeaders}.${encodedPayload}.${encodedSignature}`
}

const handlers: any = {};

export const baseStubHandlerAppend = (stub: any) => {
  Object.keys(stub.handlers).forEach((key) => {
    handlers[key] = stub.handlers[key];
  });
}

export const baseStubHandlerRoutine = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
  let method = 'GET';
  if (init && init.method) {
    method = init.method.toUpperCase();
  }

  let path = input.toString().replace(getBaseUrl(), '').toLowerCase();
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path.includes('?')) {
    path = path.substring(0, path.indexOf('?'))
  }

  const pathKey = `${method} ${path}`;
  if (handlers[pathKey]) {
    return handlers[pathKey](input, init);
  } else {
    throw `no stub handler for ${pathKey}`;
  }
};
