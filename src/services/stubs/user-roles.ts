import {
  baseBulkStub,
  baseCreateStub, baseDeleteStub,
  baseListLoad,
  baseListStub,
  baseReadStub,
  baseUpdateStub,
  generateUuid, IBulkStubScenarioResponse, stubScenario
} from '@/services/base/stub';
import {IUserRole, userRoles} from '@/services/repositories/user-roles';

export const UserRolesList: IUserRole[] = baseListLoad([
  {
    id: generateUuid(),
    status: 'approved',
    name: 'Administrators',
    description: 'This user role has the highest privileges in the system and can do pretty much anything',
    super: true,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'pending',
    name: 'Editors',
    super: false,
    description: 'This user role can edit most data',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'viewers',
    name: 'Viewers',
    super: false,
    description: 'This user role can view most data',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'test1',
    name: 'Test1',
    description: 'This is a test',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'test2',
    name: 'Test2',
    description: 'This is a test',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'test3',
    name: 'Test3',
    description: 'This is a test',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'test4',
    name: 'Test4',
    description: 'This is a test',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'test5',
    name: 'Test5',
    description: 'This is a test',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'test6',
    name: 'Test6',
    description: 'This is a test',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], userRoles);

const stub = {
  repository: userRoles,
  handlers: {
    'GET /user-roles': baseListStub(userRoles),
    'POST /user-roles': baseCreateStub(userRoles),
    'GET /user-roles/:id': baseReadStub(userRoles),
    'PUT /user-roles/:id': baseUpdateStub(userRoles),
    'DELETE /user-roles/:id': baseDeleteStub(userRoles),
    'POST /user-roles/bulk': baseBulkStub(userRoles, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
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
        scenario: stubScenario({}, 400, new Headers({'Message':'$vuetify.errors.unknownBulkAction','Message-Arguments':`${action}###${userRoles.entity}`}))
      };
    }),
  },
  initialData: UserRolesList,
};

export const StubUserRoles = stub;
