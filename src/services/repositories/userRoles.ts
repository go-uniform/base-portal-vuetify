import {
    baseList,
    baseCreate,
    baseRead,
    baseUpdate,
    baseDelete,
    baseTableHeaders,
    baseListStub,
    baseCreateStub, baseReadStub, baseUpdateStub, baseDeleteStub, baseBulkStub
} from '../base';

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
    {
        id: '625ae8cdc7cee73e4d177ecc',
        name: 'Editors',
        description: 'This user role can edit most data',
        allowPermissionsByDefault: true,
        permissionsAllowed: [],
        permissionsDenied: [],
        allowEntitiesByDefault: true,
        entitiesAllowed: [],
        entitiesDenied: [],
        createdAt: new Date('2022-04-08T08:31:04.000Z'),
    },
    {
        id: '625ae8e197304b98b929f1f7',
        name: 'Viewers',
        description: 'This user role can view most data',
        allowPermissionsByDefault: true,
        permissionsAllowed: [],
        permissionsDenied: [],
        allowEntitiesByDefault: true,
        entitiesAllowed: [],
        entitiesDenied: [],
        createdAt: new Date('2022-04-08T08:31:04.000Z'),
    },
];
const StubRecord: UserRole = StubList[0];
const entity = 'userRoles';

export const userRoles: any = {
    freeTextSearch: true,
    entity: entity,
    title: {
        singular: 'User Role',
        plural: 'User Roles',
    },
    defaultSortOrder: '-createdAt',
    listPage: '/user-roles',
    addPage: '/user-roles/add',
    viewPagePrefix: '/user-roles/view',
    editPagePrefix: '/user-roles/edit',
    default: {
    },
    fields: {
        id: {
            label: 'Id',
            type: 'uuid',
            readonly: true,
        },
        name: {
            label: 'Name',
            type: 'text',
        },
        description: {
            label: 'Description',
            type: 'textarea',
            optional: true,
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
            filterable: true,
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
    sections: [
        {
            lg: 12,
            md: 12,
            title: 'General',
            fields: [
                'id',
                'name',
                'description',
                'createdAt',
            ],
        },
    ],
    bulkActions: [
        {
            color: 'error',
            icon: 'mdi-delete',
            key: 'delete',
            title: 'Delete'
        },
    ],

    list: baseListStub<IListResponse>(entity, {status:200,headers: new Headers(),items:StubList}),
    create: baseCreateStub<IItemResponse>(entity, {status:200,headers: new Headers(),item:StubRecord}),
    read: baseReadStub<IItemResponse>(entity, {status:200,headers: new Headers(),item:StubRecord}),
    update: baseUpdateStub<IItemResponse>(entity, {status:200,headers: new Headers(),item:StubRecord}),
    delete: baseDeleteStub<IItemResponse>(entity, StubList,{status:200,headers: new Headers(),item:StubRecord}),
    bulk: baseBulkStub(entity, {status:200,headers: new Headers(),item:{}})
};
