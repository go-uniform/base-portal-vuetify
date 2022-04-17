import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/userRoles';

const generateCrudRoutes = (...repositories: any[]) => {
  {
    return [
      {
        path: '/users/view/:id',
        name: 'users-view',
        component: () => import('../views/EntityView.vue'),
        meta: {
          repository: users
        }
      },
      {
        path: '/users/edit/:id',
        name: 'users-edit',
        component: () => import('../views/EntityEdit.vue'),
        meta: {
          repository: users
        }
      },
      {
        path: '/users/add',
        name: 'users-add',
        component: () => import('../views/EntityEdit.vue'),
        meta: {
          repository: users
        }
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/EntityList.vue'),
        meta: {
          repository: users
        }
      },
      {
        path: '/user-roles',
        name: 'users-roles',
        component: () => import('../views/EntityList.vue'),
        meta: {
          repository: userRoles,
        }
      },
      {
        path: '/user-roles/view/:id',
        name: 'user-roles-view',
        component: () => import('../views/EntityView.vue'),
        meta: {
          repository: userRoles,
        }
      },
      {
        path: '/user-roles/edit/:id',
        name: 'user-roles-edit',
        component: () => import('../views/EntityEdit.vue'),
        meta: {
          repository: userRoles,
        }
      },
      {
        path: '/user-roles/add',
        name: 'user-roles-add',
        component: () => import('../views/EntityEdit.vue'),
        meta: {
          repository: userRoles,
        }
      },
    ]
  }
}

export const crudRoutes = generateCrudRoutes(users, userRoles);
