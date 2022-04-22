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
    key: 'sex',
    name: 'Sex',
    description: 'Either of the two main categories (male and female) into which humans and most other living things are divided on the basis of their reproductive functions.',
    type: EnumAttributeType.Text,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
];
const StubRecord: IAttribute = StubList[0];
const entity = 'userAttributes';

export const userAttributes: IRepository<IAttribute> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: 'custom.userAttributes.singular',
    plural: 'custom.userAttributes.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/user-attributes',
  addPage: '/user-attributes/add',
  viewPagePrefix: '/user-attributes/view',
  editPagePrefix: '/user-attributes/edit',
  fields: {
    id: {
      label: 'custom.userAttributes.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    type: { // todo: create enum type fields that are limited to a specific selection of values
      label: 'custom.userAttributes.fields.type',
      type: EnumFieldType.Text,
    },
    key: {
      label: 'custom.userAttributes.fields.key',
      type: EnumFieldType.Text,
      pattern: /^[a-zA-z0-9]+$/,
      patternMessage: 'custom.validations.jsonKey',
    },
    name: {
      label: 'custom.userAttributes.fields.name',
      type: EnumFieldType.Text,
    },
    description: {
      label: 'custom.userAttributes.fields.description',
      type: EnumFieldType.TextArea,
      optional: true,
    },
    modifiedAt: {
      label: 'custom.userAttributes.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: 'custom.userAttributes.fields.createdAt',
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
    new Section('custom.userAttributes.sections.general', [
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
