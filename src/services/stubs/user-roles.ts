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
    description: 'This user role can edit most data',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    status: 'rejected',
    name: 'Viewers',
    description: 'This user role can view most data',
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], userRoles.entity);

const stub = {
  repository: userRoles,
  handlers: {
    'GET /user-roles': baseListStub(userRoles.entity),
    'POST /user-roles/:id': baseCreateStub(userRoles.entity),
    'GET /user-roles/:id': baseReadStub(userRoles.entity),
    'PUT /user-roles/:id': baseUpdateStub(userRoles.entity),
    'DELETE /user-roles/:id': baseDeleteStub(userRoles.entity),
    'POST /user-roles/bulk': baseBulkStub(userRoles.entity, (action: string, indexes: number[], list: any[]): IBulkStubScenarioResponse => {
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
