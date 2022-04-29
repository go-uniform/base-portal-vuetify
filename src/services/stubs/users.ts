import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, IStubScenario, stubScenario
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
    userRole: {
      id: UserRolesList[0].id,
      label: UserRolesList[0].name,
    },
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

const recordAssemblyHandler = (item: User) => {
  if (item.userRole) {
    const userRoleId = item.userRole.id;
    const userRoles = UserRolesList.filter((userRole) => userRole.id === userRoleId)
    if (userRoles && userRoles.length > 0) {
      item.userRole = {
        id: userRoles[0].id,
        label: userRoles[0].name,
      };
    }
  }
  if (item.parentUser) {
    const userId = item.parentUser.id;
    const users = UsersList.filter((user) => user.id === userId)
    if (users && users.length > 0) {
      item.parentUser = {
        id: users[0].id,
        label: `${users[0].firstName} ${users[0].lastName}`,
      };
    }
  }
  return item;
};

const stub = {
  repository: users,
  handlers: {
    'GET /users': baseListStub(users.entity),
    'POST /users/:id': baseCreateStub(users.entity, recordAssemblyHandler),
    'GET /users/:id': baseReadStub(users.entity),
    'PUT /users/:id': baseUpdateStub(users.entity, recordAssemblyHandler),
    'DELETE /users/:id': baseDeleteStub(users.entity),
    'POST /users/bulk': baseBulkStub(users.entity, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
      switch (action) {
        case 'delete':
          return {
            scenario: stubScenario({}),
            list: list.filter(function(value, index, arr){
              return !indexes.includes(index);
            }),
          };
      }
      return {
        scenario: stubScenario({}, 400, new Headers({'Message':'$vuetify.errors.unknownBulkAction','Message-Arguments':`${action}###${users.entity}`}))
      };
    }),
  },
  initialData: UsersList,
};

export const StubUsers = stub;
