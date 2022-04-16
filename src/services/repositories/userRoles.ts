import {baseList, baseCreate, baseRead, baseUpdate, baseDelete, baseTableHeaders} from '../base';

interface UserRoleEntity {
    type: string;
    id: string;
}

interface UserRole {
    id: string;
    name: string;
    description: string;
    allowPermissionsByDefault: boolean;
    permissionsAllowed: string[];
    permissionsDenied: string[];
    allowEntitiesByDefault: boolean;
    entitiesAllowed: UserRoleEntity[];
    entitiesDenied: UserRoleEntity[];
    createdAt: Date;
}

interface IListResponse {
    status: number;
    headers: Headers;
    items: UserRole[];
}

interface IItemResponse {
    status: number;
    headers: Headers;
    item: UserRole;
}

const StubList: UserRole[] = [
    {
        id: '624df0929bc786ddf868f7e8',
        name: 'Administrators',
        description: 'This user role has the highest privileges in the system and can do pretty much anything',
        allowPermissionsByDefault: true,
        permissionsAllowed: [],
        permissionsDenied: [],
        allowEntitiesByDefault: true,
        entitiesAllowed: [],
        entitiesDenied: [],
        createdAt: new Date('2022-04-06T08:31:04.000Z'),
    },
];
const StubRecord: UserRole = StubList[0];

export const userRoles: any = {
    entity: 'userRoles',
    title: {
        singular: 'User Role',
        plural: 'User Roles',
    },
    defaultSortOrder: '-createdAt',
    listPage: '/user-roles',
    viewPagePrefix: '/user-roles/view',
    editPagePrefix: '/user-roles/edit',
    fields: {
        name: {
            label: 'Name',
            type: 'text',
        },
        description: {
            label: 'Description',
            type: 'textarea',
        },
        createdAt: {
            label: 'Created At',
            type: 'datetime',
            editable: false,
        },
    },
    headers: [
        {
            field: 'name',
            align: 'start',
        },
        {
            field: 'description',
            align: 'start',
        },
        {
            field: 'createdAt',
            align: 'end',
        },
    ],
    filters: (): any => {
        return {
        };
    },

    list: (
      order: string = userRoles.defaultSortOrder,
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

            baseList(userRoles.entity, order, filters, pageIndex, pageSize).then((response) => {
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
      document: UserRole,
    ): Promise<IItemResponse> => {
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                item: StubRecord,
            });
            return;

            baseCreate(userRoles.entity, document).then((response) => {
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

            baseRead(userRoles.entity, id).then((response) => {
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
      document: UserRole,
    ): Promise<IItemResponse> => {
        return new Promise<IItemResponse>((resolve, reject) => {
            resolve({
                status: 200,
                headers: new Headers(),
                item: StubRecord,
            });
            return;

            baseUpdate(userRoles.entity, id, document).then((response) => {
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

            baseDelete(userRoles.entity, id).then((response) => {
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
