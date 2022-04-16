import {
    baseList,
    baseCreate,
    baseRead,
    baseUpdate,
    baseDelete,
    baseTableHeaders,
    baseListStub,
    baseCreateStub, baseReadStub, baseUpdateStub, baseDeleteStub
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
];
const StubRecord: UserRole = StubList[0];
const entity = 'userRoles';

export const userRoles: any = {
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

    list: baseListStub<IListResponse>(entity, {status:200,headers: new Headers(),items:StubList}),
    create: baseCreateStub<IItemResponse>(entity, {status:200,headers: new Headers(),item:StubRecord}),
    read: baseReadStub<IItemResponse>(entity, {status:200,headers: new Headers(),item:StubRecord}),
    update: baseUpdateStub<IItemResponse>(entity, {status:200,headers: new Headers(),item:StubRecord}),
    delete: baseDeleteStub<IItemResponse>(entity, StubList,{status:200,headers: new Headers(),item:StubRecord}),

};
