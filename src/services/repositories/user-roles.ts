import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub, baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
} from '@/services/base/stub';
import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {permissions} from '@/services/repositories/permissions';

const entity = 'userRoles';

export const UserRolesList: UserRole[] = baseListLoad([
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
], entity);

const stubRecordHandler = (item: any) => {
  return item;
}

interface UserRole {
  id: string;
  status: string;
  name: string;
  description: string;
  super?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

export const userRoles: IRepository<UserRole> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: '$vuetify.userRoles.singular',
    plural: '$vuetify.userRoles.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/user-roles',
  addPage: '/user-roles/add',
  viewPagePrefix: '/user-roles/view',
  editPagePrefix: '/user-roles/edit',
  fields: {
    id: {
      label: '$vuetify.userRoles.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    status: {
      label: '$vuetify.userRoles.fields.status',
      type: EnumFieldType.Enumeration,
      defaultValue: 'pending',
      values: [
        {
          value: 'pending',
          title: '$vuetify.userRoles.enums.status.pending.title',
          icon: '$vuetify.userRoles.enums.status.pending.icon',
          color: '$vuetify.userRoles.enums.status.pending.color',
        },
        {
          value: 'approved',
          title: '$vuetify.userRoles.enums.status.approved.title',
          icon: '$vuetify.userRoles.enums.status.approved.icon',
          color: '$vuetify.userRoles.enums.status.approved.color',
        },
        {
          value: 'rejected',
          title: '$vuetify.userRoles.enums.status.rejected.title',
          icon: '$vuetify.userRoles.enums.status.rejected.icon',
          color: '$vuetify.userRoles.enums.status.rejected.color',
        }
      ],
      textOnly: true,
      filterable: true,
    },
    name: {
      label: '$vuetify.userRoles.fields.name',
      type: EnumFieldType.Text,
    },
    description: {
      label: '$vuetify.userRoles.fields.description',
      type: EnumFieldType.TextArea,
      optional: true,
    },
    super: {
      label: '$vuetify.userRoles.fields.super',
      type: EnumFieldType.Boolean,
      optional: true,
      hint: '$vuetify.userRoles.hints.super',
      iconOnly: true,
      filterable: true,
    },
    permissions: {
      label: '$vuetify.userRoles.fields.permissions',
      type: EnumFieldType.Attributes,
      attributeRepository: permissions,
    },
    modifiedAt: {
      label: '$vuetify.userRoles.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: '$vuetify.userRoles.fields.createdAt',
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
    new Section('$vuetify.userRoles.sections.general', [
      'id',
      'status',
      'name',
      'description',
      'super',
      'modifiedAt',
      'createdAt',
    ]),
    new Section('$vuetify.userRoles.sections.permissions', [
      'permissions',
    ]),
  ],
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      title: '$vuetify.entityList.delete',
      key: 'delete'
    }
  ],

  list: baseListStub<UserRole>(UserRolesList, null, entity),
  create: baseCreateStub<UserRole>(UserRolesList, stubRecordHandler, entity),
  read: baseReadStub<UserRole>(UserRolesList, null, entity),
  update: baseUpdateStub<UserRole>(UserRolesList, stubRecordHandler, entity),
  delete: baseDeleteStub<UserRole>(UserRolesList, null, entity),
  bulk: baseBulkStub<UserRole>(UserRolesList, null, entity),
};
