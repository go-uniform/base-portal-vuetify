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
import {processStandardItemResponse, processStandardListResponse} from '@/services/base/base';
import {generic} from '@/services/base/global.types';
import {EnumHttpMethod} from '@/services/base/global.enums';

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

export const baseRestItemStub = <T>(scenario: IStubScenario, callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IItem<T>> => {
  return new Promise<IItem<T>>((resolve, reject) => {
    console.log('rest-item', method, path, payload, headers);
  });
};
export const baseRestListStub = <T>(scenario: IStubScenario, callbackResolve: any, callbackReject: any, method: EnumHttpMethod, path: string, payload: generic = {}, headers = new Headers()): Promise<IList<T>> => {
  return new Promise<IList<T>>((resolve, reject) => {
    console.log('rest-list', method, path, payload, headers);
  });
};

export const baseListStub = <T>(scenario: IStubScenario, entity: string): IListPromise<T> => {
  return (
    order: string,
    filters: object = {},
    pageIndex = 1,
    pageSize = 50,
  ): Promise<IList<T>> => {
    return new Promise<IList<T>>((resolve, reject) => {
      console.log('list', entity, order, filters, pageIndex, pageSize);
      processStandardListResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseCreateStub = <T>(scenario: IStubScenario, entity: string): ICreatePromise<T> => {
  return (
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('create', entity, document);
      processStandardItemResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseReadStub = <T>(scenario: IStubScenario, entity: string): IReadPromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('read', entity, id);
      processStandardItemResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseUpdateStub = <T>(scenario: IStubScenario, entity: string): IUpdatePromise<T> => {
  return (
    id: string,
    document: T,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('update', entity, id, document);
      processStandardItemResponse<T>(scenario, resolve, reject);
    });
  };
};

export const baseDeleteStub = <T>(scenario: IStubScenario, list: T[], entity: string): IDeletePromise<T> => {
  return (
    id: string,
  ): Promise<IItem<T>> => {
    return new Promise<IItem<T>>((resolve, reject) => {
      console.log('delete', entity, id);
      processStandardItemResponse<T>(scenario, (value: IItem<T>) => {
        list.pop();
        resolve(value);
      }, reject);
    });
  };
};

export const baseBulkStub = (scenario: IStubScenario, entity: string): IBulkPromise => {
  return (
    action: string,
    ids: string[],
  ): Promise<IItem<generic>> => {
    return new Promise<IItem<generic>>((resolve, reject) => {
      console.log('bulk', entity, action, ids);
      processStandardItemResponse<generic>(scenario, resolve, reject);
    });
  };
};
