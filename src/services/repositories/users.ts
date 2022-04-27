import {userRoles, UserRolesList} from '@/services/repositories/user-roles';
import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub, baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
} from '@/services/base/stub';
import {Section} from '@/services/base/global.classes.section';
import {userAttributes} from '@/services/repositories/user-attributes';
import {permissions} from '@/services/repositories/permissions';
import {Attributes} from "@/services/base/global.types";

const entity = 'users';

export const UsersList: User[] = baseListLoad([
  {
    id: '62658668e80509c3a8d4cd18',
    firstName: 'Justin',
    lastName: 'Robertson',
    username: 'justin@somewhere.co.za',
    email: 'justin@somewhere.co.za',
    password: 'password',
    userRoleId: '624df0929bc786ddf868f7e8',
    userRoleLabel: 'Administrators',
    attributes: {
      sex: "male",
    },
    permissions: {
      'usersListOwner': 'allow',
    },
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: '62658660e42de5175f35c2ed',
    firstName: 'Joe',
    lastName: 'Soap',
    username: 'joe@somewhere.co.za',
    email: 'joe@somewhere.co.za',
    password: 'password',
    userRoleId: '624df0929bc786ddf868f7e8',
    userRoleLabel: 'Administrators',
    attributes: {
      sex: "male",
    },
    permissions: {
      'users.list.owner': 'deny',
    },
    parentUserId: '62658668e80509c3a8d4cd18',
    parentUserLabel: 'Justin Robertson',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], entity);

const stubRecordHandler = (item: User) => {
  if (item.userRoleId) {
    const userRoles = UserRolesList.filter((userRole) => userRole.id === item.userRoleId)
    item.userRoleLabel = userRoles[0].name;
  }
  if (item.parentUserId) {
    const users = UsersList.filter((user) => user.id === item.parentUserId)
    item.parentUserLabel = `${users[0].firstName} ${users[0].lastName}`;
  }
  return item;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userRoleId: string;
  userRoleLabel: string;
  parentUserId?: string;
  parentUserLabel?: string;
  attributes: Attributes;
  permissions: Attributes;
  allowPermissionByDefault?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

export const users: IRepository<User> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: '$vuetify.users.singular',
    plural: '$vuetify.users.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/users',
  addPage: '/users/add',
  viewPagePrefix: '/users/view',
  editPagePrefix: '/users/edit',
  default: {},
  fields: {
    id: {
      label: '$vuetify.users.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    firstName: {
      label: '$vuetify.users.fields.firstName',
      type: EnumFieldType.Text,
    },
    lastName: {
      label: '$vuetify.users.fields.lastName',
      type: EnumFieldType.Text,
    },
    username: {
      label: '$vuetify.users.fields.username',
      type: EnumFieldType.Text,
    },
    email: {
      label: '$vuetify.users.fields.email',
      type: EnumFieldType.Text,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: '$vuetify.validations.email',
      optional: true,
    },
    userRoleId: {
      label: '$vuetify.users.fields.userRoleId',
      type: EnumFieldType.LinkId,
      linkLabelFieldKey: 'userRoleLabel',
      linkRepository: userRoles,
    },
    userRoleLabel: {
      label: '$vuetify.users.fields.userRoleId',
      type: EnumFieldType.LinkLabel,
      linkIdFieldKey: 'userRoleId',
      readonly: true,
    },
    parentUserId: {
      label: '$vuetify.users.fields.parentUserId',
      type: EnumFieldType.SelfReferenceId,
      selfReferenceLabelFieldKey: 'parentUserLabel',
      textAssemblyCallback: (item) => { return `${item.firstName} ${item.lastName}`; },
      optional: true,
    },
    parentUserLabel: {
      label: '$vuetify.users.fields.parentUserLabel',
      type: EnumFieldType.SelfReferenceLabel,
      selfReferenceIdFieldKey: 'parentUserId',
      readonly: true,
      optional: true,
    },
    attributes: {
      label: '$vuetify.users.fields.attributes',
      type: EnumFieldType.Attributes,
      attributeRepository: userAttributes,
    },
    permissions: {
      label: '$vuetify.users.fields.permissions',
      type: EnumFieldType.Attributes,
      attributeRepository: permissions,
    },
    modifiedAt: {
      label: '$vuetify.users.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: '$vuetify.users.fields.createdAt',
      type: EnumFieldType.DateTime,
      filterable: true,
      readonly: true,
    },
  },
  headers: [
    {
      title: '$vuetify.users.virtual.name',
      displayCallback: (item) => { return `${item.firstName} ${item.lastName}` },
      sortable: false,
    },
    {
      fieldKey: 'username',
    },
    {
      fieldKey: 'email',
    },
    {
      fieldKey: 'userRoleId',
    },
    {
      fieldKey: 'parentUserId',
    },
    {
      fieldKey: 'createdAt',
      align: EnumHeaderAlign.End,
    },
  ],
  sections: [
    new Section('$vuetify.users.sections.general', [
      'id',
      'firstName',
      'lastName',
      'username',
      'email',
      'userRoleId',
      'parentUserId',
      'modifiedAt',
      'createdAt',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
    new Section('$vuetify.users.sections.attributes', [
      'attributes',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
    new Section('$vuetify.users.sections.permissions', [
      'permissions',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
  ],
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      title: '$vuetify.entityList.delete',
      key: 'delete'
    }
  ],

  list: baseListStub<User>(UsersList, null, entity),
  create: baseCreateStub<User>(UsersList, stubRecordHandler, entity),
  read: baseReadStub<User>(UsersList, null, entity),
  update: baseUpdateStub<User>(UsersList, stubRecordHandler, entity),
  delete: baseDeleteStub<User>(UsersList, null, entity),
  bulk: baseBulkStub<User>(UsersList, null, entity),
};
