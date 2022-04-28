import {baseListLoad, baseListStub, generateUuid} from '@/services/base/stub';
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
  recordAssemblyHandler: (item: IUserRole) => {
    return item;
  },
  handlers: {
    'GET /user-roles': baseListStub(userRoles.entity, null),
  },
  initialData: UserRolesList,
};

export const StubUserRoles = stub;
