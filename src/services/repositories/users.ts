import {baseList, baseCreate, baseRead, baseUpdate, baseDelete} from '../base';

interface User {
    name: string;
    createdAt: Date;
}

interface IListResponse {
    status: number,
    headers: Headers,
    users: User[],
}

interface IItemResponse {
    status: number,
    headers: Headers,
    user: User,
}

const StubList: User[] = [
    {
        name: 'Justin Robertson',
        createdAt: new Date('2022-04-06T08:31:04.000Z')
    }
];
const StubRecord: User = {
    name: 'Justin Robertson',
    createdAt: new Date('2022-04-06T08:31:04.000Z')
};

export const users = {
    entity: 'users',
    defaultSortOrder: '-createdAt',
    fields: {
        name: {
            label: 'Name',
            type: 'text'
        },
        createdAt: {
            label: 'Created At',
            type: 'datetime'
        }
    },
    filters: (): any => {
        return {
        };
    },
    headers: [
        {
            field: 'name', // can be null which means it will just be a blank template-slot
            align: 'center', // default: center,
            label: 'Name', // if field is provided and this is empty then it will use field-label by default
            sortable: true, // default: true if field is provided and false if not a field
        },
        {
            field: 'createdAt'
        }
    ],

    list: (order: string = users.defaultSortOrder, filters: any = {}, pageIndex: number = 1, pageSize: number = 50): Promise<IListResponse> => {
        // @ts-ignore
        return new Promise<IListResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                users: StubList
            }) // stub out data for now
            return;

            baseList(users.entity, order, filters, pageIndex, pageSize).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    users: response.items,
                })
            }).catch((reason) => {
                reject(reason);
            });
        });
    },
    create: (user: User): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                user: StubRecord
            }) // stub out data for now
            return;

            baseCreate(users.entity, user).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    user: response.item,
                })
            }).catch((reason) => {
                reject(reason);
            });
        });
    },
    read: (id: string): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                user: StubRecord
            }) // stub out data for now
            return;

            baseRead(users.entity, id).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    user: response.item,
                })
            }).catch((reason) => {
                reject(reason);
            });
        });
    },
    update: (id: string, user: User): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                user: StubRecord
            }) // stub out data for now
            return;

            baseUpdate(users.entity, id, user).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    user: response.item,
                })
            }).catch((reason) => {
                reject(reason);
            });
        });
    },
    delete: (id: string): Promise<IItemResponse> => {
        // @ts-ignore
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                user: StubRecord
            }) // stub out data for now
            return;

            baseDelete(users.entity, id).then((response) => {
                resolve({
                    status: response.status,
                    headers: response.headers,
                    user: response.item,
                })
            }).catch((reason) => {
                reject(reason);
            });
        });
    },
};