import {generateCrudRoutes} from '@/services/base/entity.crud';
import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {userAttributes} from '@/services/repositories/user-attributes';

export const crudRoutes = generateCrudRoutes(users, userRoles, userAttributes);
