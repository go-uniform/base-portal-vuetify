import {userRoles} from '@/services/repositories/user-roles';
import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid,
  stubScenario,
} from '@/services/base/stub';
import {Section} from '@/services/base/global.classes.section';
import {userAttributes} from '@/services/repositories/user-attributes';
import {permissions} from '@/services/repositories/permissions';

const StubList: User[] = [
  {
    id: 'xyz123',
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
    id: generateUuid(),
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
    parentUserId: 'xyz123',
    parentUserLabel: 'Justin Robertson',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
];
const StubRecord: User = StubList[0];

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
  attributes: { [key: string]: any };
  permissions: { [key: string]: any };
  modifiedAt: Date;
  createdAt: Date;
}

const entity = 'users';

export const users: IRepository<User> = {
  freeTextSearch: true,
  entity: entity,
  title: {
    singular: 'custom.users.singular',
    plural: 'custom.users.plural',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/users',
  addPage: '/users/add',
  viewPagePrefix: '/users/view',
  editPagePrefix: '/users/edit',
  default: {},
  fields: {
    id: {
      label: 'custom.users.fields.id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    firstName: {
      label: 'custom.users.fields.firstName',
      type: EnumFieldType.Text,
    },
    lastName: {
      label: 'custom.users.fields.lastName',
      type: EnumFieldType.Text,
    },
    username: {
      label: 'custom.users.fields.username',
      type: EnumFieldType.Text,
    },
    email: {
      label: 'custom.users.fields.email',
      type: EnumFieldType.Text,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: 'base.validations.email',
      optional: true,
    },
    userRoleId: {
      label: 'custom.users.fields.userRoleId',
      type: EnumFieldType.LinkId,
      linkLabelFieldKey: 'userRoleLabel',
      linkRepository: userRoles,
    },
    userRoleLabel: {
      label: 'custom.users.fields.userRoleId',
      type: EnumFieldType.LinkLabel,
      linkIdFieldKey: 'userRoleId',
      readonly: true,
    },
    parentUserId: {
      label: 'custom.users.fields.parentUserId',
      type: EnumFieldType.SelfReferenceId,
      selfReferenceLabelFieldKey: 'parentUserLabel',
      textAssemblyCallback: (item) => { return `${item.firstName} ${item.lastName}`; },
      optional: true,
    },
    parentUserLabel: {
      label: 'custom.users.fields.parentUserLabel',
      type: EnumFieldType.SelfReferenceLabel,
      selfReferenceIdFieldKey: 'parentUserId',
      readonly: true,
      optional: true,
    },
    attributes: {
      label: 'custom.users.fields.attributes',
      type: EnumFieldType.Attributes,
      attributeRepository: userAttributes,
    },
    permissions: {
      label: 'custom.users.fields.permissions',
      type: EnumFieldType.Attributes,
      attributeRepository: permissions,
    },
    modifiedAt: {
      label: 'custom.users.fields.modifiedAt',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: 'custom.users.fields.createdAt',
      type: EnumFieldType.DateTime,
      filterable: true,
      readonly: true,
    },
  },
  headers: [
    {
      fieldKey: 'firstName',
    },
    {
      fieldKey: 'lastName',
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
    new Section('custom.users.sections.general', [
      'id',
      'firstName',
      'lastName',
      'username',
      'email',
      'userRoleId',
      'parentUserId',
      'attributes',
      'modifiedAt',
      'createdAt',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
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

  list: baseListStub<User>(stubScenario(StubList), entity),
  create: baseCreateStub<User>(stubScenario(StubRecord), entity),
  read: baseReadStub<User>(stubScenario(StubRecord), entity),
  update: baseUpdateStub<User>(stubScenario(StubRecord), entity),
  delete: baseDeleteStub<User>(stubScenario(StubRecord), StubList, entity),
  bulk: baseBulkStub(stubScenario(StubRecord), entity),
};
