import {userRoles} from '@/services/repositories/user-roles';
import {Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {userAttributes} from '@/services/repositories/user-attributes';
import {permissions} from '@/services/repositories/permissions';
import {Attributes} from '@/services/base/global.types';

const entity = 'users';
const slug = 'users';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userRole: string;
  parentUser?: string;
  attributes: Attributes;
  permissions: Attributes;
  allowPermissionByDefault?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<User>(slug, {}, {});

repository.addField('firstName', {
  type: EnumValueType.Text,
});
repository.addField('lastName', {
  type: EnumValueType.Text,
});
repository.addField('username', {
  type: EnumValueType.Text,
});
repository.addField('email', {
  type: EnumValueType.Text,
  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  patternMessage: '$vuetify.validations.email',
});
repository.addField('userRole', {
  type: EnumValueType.Link,
  linkRepository: userRoles,
});
repository.addField('parentUser', {
  type: EnumValueType.SelfReference,
  textAssemblyCallback: (item) => {
    return `${item.firstName} ${item.lastName}`;
  },
  optional: true,
});
repository.addField('attributes', {
  type: EnumValueType.Attributes,
  attributeRepository: userAttributes,
});
repository.addField('permissions', {
  type: EnumValueType.Attributes,
  attributeRepository: permissions,
});

repository.setHeaders([
  {
    title: `$vuetify.${entity}.virtual.name`,
    displayCallback: (item) => {
      return `${item.firstName} ${item.lastName}`;
    },
    sortable: false,
  },
  'username',
  'email',
  'userRole',
  'parentUser',
  {
    fieldKey: 'createdAt',
    align: EnumHeaderAlign.End,
  },
]);

repository.addSection(
  new Section(`$vuetify.${entity}.sections.general`, [
    'id',
    'firstName',
    'lastName',
    'username',
    'email',
    'userRole',
    'parentUser',
    'modifiedAt',
    'createdAt',
  ])
);

repository.addSection(
  new Section(`$vuetify.${entity}.sections.attributes`, [
    'attributes',
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

export const users = repository;
