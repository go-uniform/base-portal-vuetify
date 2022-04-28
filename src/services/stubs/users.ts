import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, IStubScenario, stubScenario
} from '@/services/base/stub';
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

const recordAssemblyHandler = (item: IUser) => {
  if (item.userRoleId) {
    const userRoles = UserRolesList.filter((userRole) => userRole.id === item.userRoleId)
    item.userRoleLabel = userRoles[0].name;
  }
  if (item.parentUserId) {
    const users = UsersList.filter((user) => user.id === item.parentUserId)
    item.parentUserLabel = `${users[0].firstName} ${users[0].lastName}`;
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
