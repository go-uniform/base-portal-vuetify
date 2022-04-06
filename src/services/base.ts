import { bus } from './bus';
import {auth} from "./auth";

let baseUrl: string = '/api';

export const getBaseUrl = (): string => {
    return baseUrl;
}

export const setBaseUrl = (url): void => {
    baseUrl = url.replace(/\/+$/, ''); // rtrim('/')
    baseUrl = baseUrl.replace(/\\+$/, ''); // rtrim('\')
}

interface IListResponse {
    status: number,
    headers: Headers,
    items: any[],
}

interface IItemResponse {
    status: number,
    headers: Headers,
    item: any,
}

export const compileListQueryParameters = (order: string, filters: any): string => {
    let parts = [];

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

export const mergeHeaders = (headers: any): Headers => {
    let response = new Headers();

    let hasContentType = false;
    let hasAuthorization = false;

    if (headers != null) {
        Object.keys(headers).forEach((k) => {
            if (k.toLowerCase() === 'content-type') {
                hasContentType = true;
            }
            if (k.toLowerCase() === 'authorization') {
                hasContentType = true;
            }
            response.append(k, headers[k]);
        });
    }

    if (!hasContentType) {
        response.append('Content-Type', 'application/json');
    }
    if (!hasAuthorization) {
        let token = auth.getToken()
        if (token !== null && token !== '') {
            response.append('Authorization', `Bearer ${token}`);
        }
    }

    return response;
};

export const processStandardResponse = (response, resolve, reject): void => {

    if (response.status !== 200) {
        let message = response.headers.get("Message") ?? 'Something went wrong.';
        bus.publish('toast.show', {
            type: 'success',
            message: message,
        });

        if (response.status === 400) {
            bus.publish('validation.errors', response.item);
        }

        reject(message);
        return;
    }

    response.json().then((body) => {

        let message = response.headers.get("Message") ?? '';
        if (message !== '') {
            bus.publish('toast.show', {
                type: 'success',
                message: message,
            });
        }
        resolve(body);

    });

};

export const baseList = (entity: string, order: string, filters: any = {}, pageIndex: number = 1, pageSize: number = 50): Promise<IListResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        fetch(`${baseUrl}/${entity}${compileListQueryParameters(order, filters)}`, {

            method: 'GET',
            headers: mergeHeaders({
                'Page-Size': pageSize,
                'Page-Index': pageIndex,
            })

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

export const baseCreate = (entity: string, document: any): Promise<IItemResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {

        return fetch(`${baseUrl}/${entity}`, {

            method: 'POST',
            body: JSON.stringify(document),
            headers: mergeHeaders({})

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

export const baseRead = (entity: string, id: string): Promise<IItemResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/${id}`, {

            method: 'GET',
            headers: mergeHeaders({})

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

export const baseUpdate = (entity: string, id: string, document: any): Promise<IItemResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/${id}`, {

            method: 'PUT',
            body: JSON.stringify(document),
            headers: mergeHeaders({})

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

export const baseDelete = (entity: string, id: string): Promise<IItemResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/${id}`, {

            method: 'DELETE',
            headers: mergeHeaders({})

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

// a custom against executed on an entity list level and returns a list response
export const baseEntityActionListResponse = (entity: string, action: string, payload: any = {}, headers: any = {}): Promise<IListResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/actions/${action}`, {

            method: 'POST',
            body: JSON.stringify(payload),
            headers: mergeHeaders(headers)

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

// a custom against executed on an entity list level and returns a single item response
export const baseEntityActionItemResponse = (entity: string, action: string, payload: any = {}, headers: any = {}): Promise<IItemResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/actions/${action}`, {

            method: 'POST',
            body: JSON.stringify(payload),
            headers: mergeHeaders(headers)

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

// a custom against executed against a single entity record level and returns a list response
export const baseRecordActionListResponse = (entity: string, action: string, id: string, payload: any = {}, headers: any = {}): Promise<IListResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/${id}/actions/${action}`, {

            method: 'POST',
            body: JSON.stringify(payload),
            headers: mergeHeaders(headers)

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}

// a custom against executed on an entity list level and returns a single item response
export const baseRecordActionItemResponse = (entity: string, action: string, id: string, payload: any = {}, headers: any = {}): Promise<IItemResponse> => {
    // @ts-ignore
    return new Promise<any[]>((resolve, reject) => {
        return fetch(`${baseUrl}/${entity}/${id}/actions/${action}`, {

            method: 'POST',
            body: JSON.stringify(payload),
            headers: mergeHeaders(headers)

        }).then((response) => {

            processStandardResponse(response, resolve, reject)

        }).catch((reason) => {

            reject(reason);

        });
    });
}
