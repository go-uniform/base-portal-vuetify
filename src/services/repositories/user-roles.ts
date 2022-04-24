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
import {Section} from '@/services/base/global.classes.section';
import {permissions} from '@/services/repositories/permissions';

interface UserRole {
  id: string;
  status: string;
  name: string;
  description: string;
  super?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

const StubList: UserRole[] = [
  {
    id: '624df0929bc786ddf868f7e8',
    status: 'approved',
    name: 'Administrators',
    description: 'This user role has the highest privileges in the system and can do pretty much anything',
    super: true,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: '625ae8cdc7cee73e4d177ecc',
    status: 'pending',
    name: 'Editors',
    description: 'This user role can edit most data',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: '625ae8e197304b98b929f1f7',
    status: 'rejected',
    name: 'Viewers',
    description: 'This user role can view most data',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
];
const StubRecord: UserRole = StubList[0];
const entity = 'userRoles';

export const userRoles: IRepository<UserRole> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: 'custom.userRoles.singular',
    plural: 'custom.userRoles.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/user-roles',
  addPage: '/user-roles/add',
  viewPagePrefix: '/user-roles/view',
  editPagePrefix: '/user-roles/edit',
  fields: {
    id: {
      label: 'custom.userRoles.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    status: {
      label: 'custom.userRoles.fields.status',
      type: EnumFieldType.Enumeration,
      defaultValue: 'pending',
      values: [
        {
          value: 'pending',
          title: 'custom.userRoles.enums.status.pending.title',
          icon: 'custom.userRoles.enums.status.pending.icon',
          color: 'custom.userRoles.enums.status.pending.color',
        },
        {
          value: 'approved',
          title: 'custom.userRoles.enums.status.approved.title',
          icon: 'custom.userRoles.enums.status.approved.icon',
          color: 'custom.userRoles.enums.status.approved.color',
        },
        {
          value: 'rejected',
          title: 'custom.userRoles.enums.status.rejected.title',
          icon: 'custom.userRoles.enums.status.rejected.icon',
          color: 'custom.userRoles.enums.status.rejected.color',
        }
      ],
      textOnly: true,
    },
    name: {
      label: 'custom.userRoles.fields.name',
      type: EnumFieldType.Text,
    },
    description: {
      label: 'custom.userRoles.fields.description',
      type: EnumFieldType.TextArea,
      optional: true,
    },
    super: {
      label: 'custom.userRoles.fields.super',
      type: EnumFieldType.Boolean,
      optional: true,
      hint: 'custom.userRoles.hints.super',
      iconOnly: true
    },
    permissions: {
      label: 'custom.users.fields.permissions',
      type: EnumFieldType.Attributes,
      attributeRepository: permissions,
    },
    modifiedAt: {
      label: 'custom.userRoles.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: 'custom.userRoles.fields.createdAt',
      type: EnumFieldType.DateTime,
      readonly: true,
      filterable: true,
    },
  },
  headers: [
    {
      fieldKey: 'status',
    },
    {
      fieldKey: 'name',
    },
    {
      fieldKey: 'description',
    },
    {
      fieldKey: 'super',
    },
    {
      fieldKey: 'createdAt',
      align: EnumHeaderAlign.End,
    },
  ],
  sections: [
    new Section('custom.userRoles.sections.general', [
      'id',
      'status',
      'name',
      'description',
      'super',
      'modifiedAt',
      'createdAt',
    ]),
    new Section('custom.users.sections.permissions', [
      'permissions',
    ]),
  ],
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      title: 'base.entityList.delete',
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
