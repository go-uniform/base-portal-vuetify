import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, stubScenario
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
  handlers: {
    'GET /users': baseListStub(users),
    'POST /users': baseCreateStub(users),
    'GET /users/:id': baseReadStub(users),
    'PUT /users/:id': baseUpdateStub(users),
    'DELETE /users/:id': baseDeleteStub(users),
    'POST /users/bulk': baseBulkStub(users, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
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
