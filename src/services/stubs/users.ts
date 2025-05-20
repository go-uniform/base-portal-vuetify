import {
  baseHandlers,
  baseListLoad,
  generateUuid,
} from '@/services/base/stub';
import {User, users} from '@/services/repositories/users';
import {UserRolesList} from '@/services/stubs/user-roles';

export const UsersList: User[] = baseListLoad([
  {
    id: generateUuid(),
    firstName: 'John',
    lastName: 'Smith',
    username: 'johns@go-uniform.org',
    email: 'johns@go-uniform.org',
    password: '$aMUqSrc7N3v',
    userRole: UserRolesList[0].id,
    attributes: {
      sex: 'male',
    },
    permissions: {
      'usersListOwner': 'allow',
    },
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], users);

const stub = {
  repository: users,
  handlers: baseHandlers(users),
  initialData: UsersList,
};

export const StubUsers = stub;
