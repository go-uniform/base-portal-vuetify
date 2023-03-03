import {Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {permissions} from '@/services/repositories/permissions';

const entity = 'userRoles';
const slug = 'user-roles';

export interface UserRole {
  id: string;
  status: string;
  name: string;
  description: string;
  super?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<UserRole>(slug, {}, {});

repository.addField('status', {
  type: EnumValueType.Enumeration,
  defaultValue: 'pending',
  values: [
    'pending',
    'approved',
    'rejected',
  ]
});
repository.addField('name', {
  type: EnumValueType.Text,
});
repository.addField('description', {
  type: EnumValueType.TextArea,
  optional: true,
});
repository.addField('super', {
  type: EnumValueType.Boolean,
  hint: `$vuetify.${entity}.hints.super`,
});
repository.addField('permissions', {
  type: EnumValueType.Attributes,
  attributeRepository: permissions,
});

repository.setHeaders([
  'status',
  'name',
  'description',
  'super',
  {
    fieldKey: 'createdAt',
    align: EnumHeaderAlign.End,
  },
]);

repository.addSection(
    new Section(`$vuetify.${entity}.sections.general`, [
      'id',
      'status',
      'name',
      'description',
      'super',
      'modifiedAt',
      'createdAt',
    ])
);

repository.addSection(
    new Section(`$vuetify.${entity}.sections.permissions`, [
      'permissions',
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

export const userRoles = repository;
