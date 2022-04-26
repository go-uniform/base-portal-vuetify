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
  compileListQueryParameters,
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

const wrapperResolve = <T>(callbackResolve: any, resolve: any, reject: any) => {
  return <T>(value: IItem<T>) => {
    if (callbackResolve) {
      if (!callbackResolve(value)) {
        reject('failed callback');
      }
    }
    resolve(value);
  };
};

const wrapperReject = <T>(callbackReject: any, reject: any) => {
  return <T>(reason?: any) => {
    if (callbackReject) {
      callbackReject(reason);
    }
    reject(reason);
  };
};

export const baseRestItemStub = <T>(scenario: IStubScenario, callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IItem<T>> => {
  return new Promise<IItem<T>>((resolve, reject) => {
    setTimeout(() => {
      console.log('rest-item', method, path, payload, headers);
      processStandardItemResponse<T>(scenario, wrapperResolve(callbackResolve, resolve, reject), wrapperReject(callbackReject, reject));
    }, StubTimeout);
  });
};
export const baseRestListStub = <T>(scenario: IStubScenario, callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IList<T>> => {
  return new Promise<IList<T>>((resolve, reject) => {
    setTimeout(() => {
      console.log('rest-list', method, path, payload, headers);
      processStandardItemResponse<T>(scenario, wrapperResolve(callbackResolve, resolve, reject), wrapperReject(callbackReject, reject));
    }, StubTimeout);
  });
};

export const baseListStub = <T>(list: T[], scenario: IStubScenario | null, entity: string): IListPromise<T> => {
  return (
    order: string,
    filters: object = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<IList<T>> => {
    return new Promise<IList<T>>((resolve, reject) => {
      setTimeout(() => {
        console.log('list', entity, order, filters, pageIndex, pageSize, compileListQueryParameters(order, filters));
        if (scenario) {
          processStandardListResponse<T>(scenario, resolve, reject);
        } else {
          processStandardListResponse<T>(stubScenario(list, 200), resolve, reject)
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
