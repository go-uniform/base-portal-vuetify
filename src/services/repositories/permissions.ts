import {IAttribute, Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'permissions';
const slug = 'permissions';

const repository = new Repository<IAttribute>(slug, {}, {});

repository.addField('type', {
  type: EnumValueType.Enumeration,
  defaultValue: 'inherit',
  values: [
    {
      value: 'inherit',
      title: `$vuetify.${entity}.enums.type.inherit.title`,
      icon: `$vuetify.${entity}.enums.type.inherit.icon`,
      color: `$vuetify.${entity}.enums.type.inherit.color`,
    },
    {
      value: 'allow',
      title: `$vuetify.${entity}.enums.type.allow.title`,
      icon: `$vuetify.${entity}.enums.type.allow.icon`,
      color: `$vuetify.${entity}.enums.type.allow.color`,
    },
    {
      value: 'deny',
      title: `$vuetify.${entity}.enums.type.deny.title`,
      icon: `$vuetify.${entity}.enums.type.deny.icon`,
      color: `$vuetify.${entity}.enums.type.deny.color`,
    },
  ],
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
  type: EnumValueType.Text,
});

repository.setHeaders([
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

export const permissions = repository;
