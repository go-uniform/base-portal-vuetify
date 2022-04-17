import {userRoles} from '@/services/repositories/userRoles';
import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType} from '@/services/base/global.enums';
import {
  baseBulkStub,
  baseCreateStub,
  baseDeleteStub,
  baseListStub,
  baseReadStub,
  baseUpdateStub, stubScenario
} from '@/services/base/stub';

const StubList: User[] = [
  {
    id: '624df08c51e0aff721208a9c',
    firstName: 'Justin',
    lastName: 'Robertson',
    username: 'justin@somewhere.co.za',
    email: 'justin@somewhere.co.za',
    password: 'password',
    userRoleId: '624df0929bc786ddf868f7e8',
    userRoleLabel: 'Administrators',
    modifiedAt: new Date('2022-04-06T08:31:04.000Z'),
    createdAt: new Date('2022-04-06T08:31:04.000Z'),
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
  entity: entity,
  title: {
    singular: 'User',
    plural: 'Users',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/users',
  addPage: '/users/add',
  viewPagePrefix: '/users/view',
  editPagePrefix: '/users/edit',
  default: {},
  fields: {
    id: {
      label: 'Id',
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    firstName: {
      label: 'First Name',
      type: EnumFieldType.Text,
    },
    lastName: {
      label: 'Last Name',
      type: EnumFieldType.Text,
    },
    username: {
      label: 'Username',
      type: EnumFieldType.Text,
    },
    email: {
      label: 'Email',
      type: EnumFieldType.Text,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: 'Must be a valid e-mail address.',
    },
    userRoleId: {
      label: 'User Role',
      type: EnumFieldType.LinkId,
      linkLabelFieldKey: 'userRoleLabel',
      linkRepository: userRoles,
    },
    userRoleLabel: {
      label: 'User Role',
      type: EnumFieldType.LinkLabel,
      linkIdFieldKey: 'userRoleId',
      readonly: true,
    },
    modifiedAt: {
      label: 'Modified At',
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: 'Created At',
      type: EnumFieldType.DateTime,
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
    },
  ],
  sections: [
    {
      title: 'General',
      fieldKeys: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'userRoleId',
        'modifiedAt',
        'createdAt',
      ]
    }
  ],

  list: baseListStub<User>(stubScenario(StubList), entity),
  create: baseCreateStub<User>(stubScenario(StubRecord), entity),
  read: baseReadStub<User>(stubScenario(StubRecord), entity),
  update: baseUpdateStub<User>(stubScenario(StubRecord), entity),
  delete: baseDeleteStub<User>(stubScenario(StubRecord), StubList, entity),
  bulk: baseBulkStub(stubScenario(StubRecord), entity),
};
