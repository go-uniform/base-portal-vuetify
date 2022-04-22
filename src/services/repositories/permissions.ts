import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  stubScenario,
} from '@/services/base/stub';
import {IAttribute, IRepository} from '@/services/base/global.interfaces';
import {EnumAttributeType, EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const StubList: IAttribute[] = [
  {
    id: '624df0929bc786ddf868f7e8',
    key: 'usersListOwner',
    name: 'Users List Owner',
    description: 'Ability to list users that you own or your group owns in some way.',
    type: EnumAttributeType.Text,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
];
const StubRecord: IAttribute = StubList[0];
const entity = 'permissions';

export const permissions: IRepository<IAttribute> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: 'custom.permissions.singular',
    plural: 'custom.permissions.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/permissions',
  addPage: '/permissions/add',
  viewPagePrefix: '/permissions/view',
  editPagePrefix: '/permissions/edit',
  fields: {
    id: {
      label: 'custom.permissions.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    type: { // todo: create enum type fields that are limited to a specific selection of values
      label: 'custom.permissions.fields.type',
      type: EnumFieldType.Text,
      // values: [
      //   {
      //     value: null,
      //     text: 'custom.permissions.inherit',
      //   },
      //   {
      //     value: 'allow',
      //     text: 'custom.permissions.allow',
      //   },
      //   {
      //     value: 'deny',
      //     text: 'custom.permissions.deny',
      //   },
      // ],
    },
    key: {
      label: 'custom.permissions.fields.key',
      type: EnumFieldType.Text,
      pattern: /^[a-zA-z0-9]+$/,
      patternMessage: 'custom.validations.jsonKey',
    },
    name: {
      label: 'custom.permissions.fields.name',
      type: EnumFieldType.Text,
    },
    description: {
      label: 'custom.permissions.fields.description',
      type: EnumFieldType.TextArea,
      optional: true,
    },
    modifiedAt: {
      label: 'custom.permissions.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: 'custom.permissions.fields.createdAt',
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
    new Section('custom.permissions.sections.general', [
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
      title: 'base.entityList.delete',
      key: 'delete'
    }
  ],

  list: baseListStub<IAttribute>(stubScenario(StubList), entity),
  create: baseCreateStub<IAttribute>(stubScenario(StubRecord), entity, ),
  read: baseReadStub<IAttribute>(stubScenario(StubRecord), entity),
  update: baseUpdateStub<IAttribute>(stubScenario(StubRecord), entity),
  delete: baseDeleteStub<IAttribute>(stubScenario(StubRecord), StubList, entity),
  bulk: baseBulkStub(stubScenario(StubRecord), entity),
};
