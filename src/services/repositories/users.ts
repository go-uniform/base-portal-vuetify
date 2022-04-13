import {baseList, baseCreate, baseRead, baseUpdate, baseDelete, baseTableHeaders} from '../base';
import {userRoles} from '@/services/repositories/userRoles';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    userRoleId: string;
    userRoleLabel: string;
    modifiedAt: Date;
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
        id: '624df08c51e0aff721208a9c',
        firstName: 'Justin',
        lastName: 'Robertson',
        username: 'justin@somewhere.co.za',
        email: 'justin@somewhere.co.za',
        password: 'password',
        userRoleId: '624df0929bc786ddf868f7e8',
        userRoleLabel: 'Administrators',
        modifiedAt: new Date('2022-04-06T08:31:04.000Z'),
        createdAt: new Date('2022-04-06T08:31:04.000Z'),
    },
];
const StubRecord: User = StubList[0];

export const users: any = {
    entity: 'users',
    defaultSortOrder: '-createdAt',
    listPage: '/users',
    viewPagePrefix: '/users/view',
    editPagePrefix: '/users/edit',
    fields: {
        id: {
            label: 'Id',
            type: 'uuid',
            readonly: true,
        },
        firstName: {
            label: 'First Name',
            type: 'text',
        },
        lastName: {
            label: 'Last Name',
            type: 'text',
        },
        username: {
            label: 'Username',
            type: 'text',
        },
        email: {
            label: 'Email',
            type: 'text',
        },
        userRoleId: {
            label: 'User Role',
            type: 'linkId',
            linkLabelField: 'userRoleLabel',
            linkRepository: userRoles,
            linkTargetPath: userRoles.viewPagePrefix,
        },
        userRoleLabel: {
            label: 'User Role',
            type: 'linkLabel',
            linkIdField: 'userRoleId',
        },
        modifiedAt: {
            label: 'Modified At',
            type: 'datetime',
            readonly: true,
        },
        createdAt: {
            label: 'Created At',
            type: 'datetime',
            readonly: true,
        },
    },
    headers: [
        {
            field: 'firstName',
        },
        {
            field: 'lastName',
        },
        {
            field: 'username',
        },
        {
            field: 'email',
        },
        {
            field: 'userRoleId',
        },
        {
            field: 'createdAt',
        },
    ],
    filters: (): any => {
        return {
        };
    },

    list: (
      order: string = users.defaultSortOrder,
      filters: any = {},
      pageIndex = 1,
      pageSize = 50,
    ): Promise<IListResponse> => {
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
        return new Promise<IItemResponse>((resolve, reject) => {
            StubList.pop();

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
