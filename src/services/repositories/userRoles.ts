import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  stubScenario,
} from '@/services/base/stub';
import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';

interface UserRole {
  id: string;
  name: string;
  description: string;
  modifiedAt: Date;
  createdAt: Date;
}

const StubList: UserRole[] = [
  {
    id: '624df0929bc786ddf868f7e8',
    name: 'Administrators',
    description: 'This user role has the highest privileges in the system and can do pretty much anything',
    modifiedAt: new Date('2022-04-06T08:31:04.000Z'),
    createdAt: new Date('2022-04-06T08:31:04.000Z'),
  },
  {
    id: '625ae8cdc7cee73e4d177ecc',
    name: 'Editors',
    description: 'This user role can edit most data',
    modifiedAt: new Date('2022-04-08T08:31:04.000Z'),
    createdAt: new Date('2022-04-08T08:31:04.000Z'),
  },
  {
    id: '625ae8e197304b98b929f1f7',
    name: 'Viewers',
    description: 'This user role can view most data',
    modifiedAt: new Date('2022-04-08T08:31:04.000Z'),
    createdAt: new Date('2022-04-08T08:31:04.000Z'),
  },
];
const StubRecord: UserRole = StubList[0];
const entity = 'userRoles';

export const userRoles: IRepository<UserRole> = {
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
  fields: {
    id: {
      label: 'Id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    name: {
      label: 'Name',
      type: EnumFieldType.Text,
    },
    description: {
      label: 'Description',
      type: EnumFieldType.TextArea,
      optional: true,
    },
    modifiedAt: {
      label: 'Modified At',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: 'Created At',
      type: EnumFieldType.DateTime,
      readonly: true,
      filterable: true,
    },
  },
  headers: [
    {
      fieldKey: 'name',
    },
    {
      fieldKey: 'description',
    },
    {
      fieldKey: 'createdAt',
      align: EnumHeaderAlign.End,
    },
  ],
  sections: [
    {
      title: 'General',
      fieldKeys: [
        'id',
        'name',
        'description',
        'modifiedAt',
        'createdAt',
      ]
    }
  ],
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      title: 'Delete',
      key: 'delete'
    }
  ],

  list: baseListStub<UserRole>(stubScenario(StubList), entity),
  create: baseCreateStub<UserRole>(stubScenario(StubRecord), entity, ),
  read: baseReadStub<UserRole>(stubScenario(StubRecord), entity),
  update: baseUpdateStub<UserRole>(stubScenario(StubRecord), entity),
  delete: baseDeleteStub<UserRole>(stubScenario(StubRecord), StubList, entity),
  bulk: baseBulkStub(stubScenario(StubRecord), entity),
};
