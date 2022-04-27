import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub, baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
} from '@/services/base/stub';
import {IAttribute, IRepository} from '@/services/base/global.interfaces';
import {EnumAttributeType, EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'permissions';

export const PermissionsList: IAttribute[] = baseListLoad([
  {
    id: '624df0929bc786ddf868f7e8',
    key: 'usersListOwner',
    name: 'Users List Owner',
    description: 'Ability to list users that you own or your group owns in some way.',
    type: EnumAttributeType.Enumeration,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: '626516d2be4f88afcc41676d',
    key: 'usersCreateOwner',
    name: 'Users Create Owner',
    description: 'Ability to create new users that you own or your group owns in some way.',
    type: EnumAttributeType.Enumeration,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], entity);

const stubRecordHandler = (item: any) => {
  return item;
}

export const permissions: IRepository<IAttribute> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: '$vuetify.permissions.singular',
    plural: '$vuetify.permissions.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/permissions',
  addPage: '/permissions/add',
  viewPagePrefix: '/permissions/view',
  editPagePrefix: '/permissions/edit',
  fields: {
    id: {
      label: '$vuetify.permissions.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    type: {
      label: '$vuetify.permissions.fields.type',
      type: EnumFieldType.Enumeration,
      defaultValue: 'inherit',
      values: [
        {
          value: 'inherit',
          title: '$vuetify.permissions.enums.type.inherit.title',
          icon: '$vuetify.permissions.enums.type.inherit.icon',
          color: '$vuetify.permissions.enums.type.inherit.color',
        },
        {
          value: 'allow',
          title: '$vuetify.permissions.enums.type.allow.title',
          icon: '$vuetify.permissions.enums.type.allow.icon',
          color: '$vuetify.permissions.enums.type.allow.color',
        },
        {
          value: 'deny',
          title: '$vuetify.permissions.enums.type.deny.title',
          icon: '$vuetify.permissions.enums.type.deny.icon',
          color: '$vuetify.permissions.enums.type.deny.color',
        },
      ],
    },
    key: {
      label: '$vuetify.permissions.fields.key',
      type: EnumFieldType.Text,
      pattern: /^[a-zA-z0-9]+$/,
      patternMessage: '$vuetify.validations.jsonKey',
    },
    name: {
      label: '$vuetify.permissions.fields.name',
      type: EnumFieldType.Text,
    },
    description: {
      label: '$vuetify.permissions.fields.description',
      type: EnumFieldType.TextArea,
      optional: true,
    },
    modifiedAt: {
      label: '$vuetify.permissions.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: '$vuetify.permissions.fields.createdAt',
      type: EnumFieldType.DateTime,
      readonly: true,
      filterable: true,
    },
  },
  headers: [
    {
      fieldKey: 'key',
    },
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
    new Section('$vuetify.permissions.sections.general', [
      'id',
      'type',
      'key',
      'name',
      'description',
      'modifiedAt',
      'createdAt',
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

  list: baseListStub<IAttribute>(PermissionsList, null, entity),
  create: baseCreateStub<IAttribute>(PermissionsList, stubRecordHandler, entity),
  read: baseReadStub<IAttribute>(PermissionsList, null, entity),
  update: baseUpdateStub<IAttribute>(PermissionsList, stubRecordHandler, entity),
  delete: baseDeleteStub<IAttribute>(PermissionsList, null, entity),
  bulk: baseBulkStub<IAttribute>(PermissionsList, null, entity),
};
