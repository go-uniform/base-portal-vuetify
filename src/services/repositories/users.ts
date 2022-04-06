import {baseList, baseCreate, baseRead, baseUpdate, baseDelete, baseTableHeaders} from '../base';

interface User {
    name: string;
    createdAt: Date;
}

interface IListResponse {
    status: number;
    headers: Headers;
    items: User[];
}

interface IItemResponse {
    status: number;
    headers: Headers;
    item: User;
}

const StubList: User[] = [
    {
        name: 'Justin Robertson',
        createdAt: new Date('2022-04-06T08:31:04.000Z'),
    },
];
const StubRecord: User = StubList[0];

export const users: any = {
    entity: 'users',
    defaultSortOrder: '-createdAt',
    fields: {
        name: {
            label: 'Name',
            type: 'text',
        },
        createdAt: {
            label: 'Created At',
            type: 'datetime',
            editable: false,
        },
    },
    filters: (): any => {
        return {
        };
    },
    headers: [
        {
            field: 'name',
            align: 'start',
        },
        {
            field: 'createdAt',
            align: 'end',
        },
    ],

    tableHeaders: (): any[] => {
        return baseTableHeaders(users);
    },

    list: (
      order: string = users.defaultSortOrder,
      filters: any = {},
      pageIndex: number = 1,
      pageSize: number = 50,
    ): Promise<IListResponse> => {
        // @ts-ignore
        return new Promise<IListResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                items: StubList,
            });
            return;

            baseList(users.entity, order, filters, pageIndex, pageSize).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    items: response.items,
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    },

    create: (
      document: User,
    ): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                item: StubRecord,
            });
            return;

            baseCreate(users.entity, document).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    item: response.item,
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    },

    read: (
      id: string,
    ): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                item: StubRecord,
            });
            return;

            baseRead(users.entity, id).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    item: response.item,
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    },

    update: (
      id: string,
      document: User,
    ): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                item: StubRecord,
            });
            return;

            baseUpdate(users.entity, id, document).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    item: response.item,
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    },

    delete: (
      id: string,
    ): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                item: StubRecord,
            });
            return;

            baseDelete(users.entity, id).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    item: response.item,
                });
            }).catch((reason) => {
                reject(reason);
            });
        });
    },

};
