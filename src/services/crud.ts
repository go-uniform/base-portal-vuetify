import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/userRoles';
import {RouteConfig} from 'vue-router';

const generateRepositoryCrudRoutes = (repository: any): RouteConfig[] => {
  return [
    {
      path: `${repository.listPage}`,
      name: `${repository.entity}-list`,
      component: () => import('@/views/EntityList.vue'),
      meta: {
        repository: repository,
      }
    },
    {
      path: `${repository.viewPagePrefix}/:id`,
      name: `${repository.entity}-view`,
      component: () => import('@/views/EntityView.vue'),
      meta: {
        repository: repository,
      }
    },
    {
      path: `${repository.addPage}`,
      name: `${repository.entity}-add`,
      component: () => import('@/views/EntityEdit.vue'),
      meta: {
        repository: repository,
      }
    },
    {
      path: `${repository.editPagePrefix}/:id`,
      name: `${repository.entity}-edit`,
      component: () => import('@/views/EntityEdit.vue'),
      meta: {
        repository: repository,
      }
    },
  ];
}

const generateCrudRoutes = (...repositories: any[]): RouteConfig[] => {
  const routes: RouteConfig[] = [];
  repositories.forEach((repository) => {
    routes.push(...generateRepositoryCrudRoutes(repository));
  });
  return routes;
}

export const crudRoutes = generateCrudRoutes(users, userRoles);
