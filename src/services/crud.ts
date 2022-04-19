import {generateCrudRoutes} from '@/services/base/entity.crud';
import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';

export const crudRoutes = generateCrudRoutes(users, userRoles);
