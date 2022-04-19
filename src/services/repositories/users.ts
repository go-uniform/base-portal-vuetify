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

const StubList: User[] = [
  {
    id: generateUuid(),
    firstName: 'Justin',
    lastName: 'Robertson',
    username: 'justin@somewhere.co.za',
    email: 'justin@somewhere.co.za',
    password: 'password',
    userRoleId: '624df0929bc786ddf868f7e8',
    userRoleLabel: 'Administrators',
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

  list: baseListStub<User>(stubScenario(StubList), entity),
  create: baseCreateStub<User>(stubScenario(StubRecord), entity),
  read: baseReadStub<User>(stubScenario(StubRecord), entity),
  update: baseUpdateStub<User>(stubScenario(StubRecord), entity),
  delete: baseDeleteStub<User>(stubScenario(StubRecord), StubList, entity),
  bulk: baseBulkStub(stubScenario(StubRecord), entity),
};
