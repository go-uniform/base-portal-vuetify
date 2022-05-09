import {IAttribute} from '@/services/base/global.interfaces';
import {baseListLoad, baseListStub, generateUuid} from '@/services/base/stub';
import {EnumValueType} from '@/services/base/global.enums';
import {permissions} from '@/services/repositories/permissions';

export const PermissionsList: IAttribute[] = baseListLoad([
  {
    id: generateUuid(),
    key: 'usersListOwner',
    name: 'Users List Owner',
    description: 'Ability to list users that you own or your group owns in some way.',
    type: EnumValueType.Enumeration,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: generateUuid(),
    key: 'usersCreateOwner',
    name: 'Users Create Owner',
    description: 'Ability to create new users that you own or your group owns in some way.',
    type: EnumValueType.Enumeration,
    modifiedAt: new Date(),
    createdAt: new Date(),
  },
], permissions);

const stub = {
  repository: permissions,
  recordAssemblyHandler: (item: IAttribute) => {
    return item;
  },
  handlers: {
    'GET /permissions': baseListStub(permissions),
  },
  initialData: PermissionsList,
};

export const StubPermissions = stub;
