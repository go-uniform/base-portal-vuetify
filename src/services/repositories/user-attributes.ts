import {IAttribute, Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'userAttributes';
const slug = 'user-attributes';

const repository = new Repository<IAttribute>(slug, {}, {});

repository.addField('type', {
  type: EnumValueType.Enumeration,
  defaultValue: 'text',
  values: [
    'text',
  ]
});
repository.addField('key', {
  type: EnumValueType.Text,
  pattern: /^[a-zA-z0-9]+$/,
  patternMessage: '$vuetify.validations.jsonKey',
});
repository.addField('name', {
  type: EnumValueType.Text,
});
repository.addField('description', {
  type: EnumValueType.TextArea,
  optional: true,
});

repository.setHeaders([
  'key',
  'name',
  'description',
  {
    fieldKey: 'createdAt',
    align: EnumHeaderAlign.End,
  },
]);

repository.addSection(
    new Section(`$vuetify.${entity}.sections.general`, [
      'id',
      'type',
      'key',
      'name',
      'description',
      'modifiedAt',
      'createdAt',
    ])
);

repository.bulkActions = [
  {
    color: 'error',
    icon: 'mdi-delete',
    title: '$vuetify.entityList.delete',
    key: 'delete'
  }
];

export const userAttributes = repository;
