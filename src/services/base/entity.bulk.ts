import {getBaseUrl, mergeHeaders, processStandardItemResponse} from '@/services/base/base';
import {IBulkPromise} from '@/services/base/global.interfaces';

export const baseBulk = (entity: string): IBulkPromise => {
  return (
    action: string,
    ids: string[]
  ): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      return fetch(`${getBaseUrl()}/${entity}/bulk`, {
        method: 'POST',
        body: JSON.stringify({
          action: action,
          ids: ids,
        }),
        headers: mergeHeaders({}),
      }).then((response) => {
        processStandardItemResponse<any>(response, resolve, reject);
      }).catch((reason) => {
        reject(reason);
      });
    });
  };
};
