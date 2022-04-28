import {baseListLoad, baseListStub, generateUuid} from '@/services/base/stub';
import {IUser, users} from '@/services/repositories/users';
import {UserRolesList} from '@/services/stubs/user-roles';

export const UsersList: IUser[] = baseListLoad([
  {
    id: generateUuid(),
    firstName: 'John',
    lastName: 'Smith',
    username: 'johns@go-uniform.org',
    email: 'johns@go-uniform.org',
    password: '$aMUqSrc7N3v',
    userRoleId: UserRolesList[0].id,
    userRoleLabel: UserRolesList[0].name,
    attributes: {
      sex: "male",
    },
    permissions: {
      'usersListOwner': 'allow',
    },
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], users.entity);

const stub = {
  repository: users,
  recordAssemblyHandler: (item: IUser) => {
    if (item.userRoleId) {
      const userRoles = UserRolesList.filter((userRole) => userRole.id === item.userRoleId)
      item.userRoleLabel = userRoles[0].name;
    }
    if (item.parentUserId) {
      const users = UsersList.filter((user) => user.id === item.parentUserId)
      item.parentUserLabel = `${users[0].firstName} ${users[0].lastName}`;
    }
    return item;
  },
  handlers: {
    'GET /users': baseListStub(users.entity, null),
  },
  initialData: UsersList,
};

export const StubUsers = stub;
