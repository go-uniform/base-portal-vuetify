import {createRepositoryCrudRoutes} from '@/services/base/entity.crud';
import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {userAttributes} from '@/services/repositories/user-attributes';
import {RouteConfig} from 'vue-router';
import {dashboards} from '@/services/repositories/dashboards';
import {reports} from '@/services/repositories/reports';

// custom/override routes should be added here
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'dashboards',
    component: () => import('../views/base/EntityTabs.vue'),
    meta: {
      repository: dashboards,
      title: '$vuetify.home.pageTitle',
      permissions: [],
    }
  },
  {
    path: '/reports',
    name: 'report-list',
    component: () => import('../views/base/EntityCards.vue'),
    meta: {
      repository: reports,
      title: '$vuetify.reports.pageTitle',
      permissions: [],
    }
  },
  {
    path: '/reports/:id',
    name: 'report-view',
    component: () => import('../views/base/EntityCards.vue'),
    meta: {
      repository: reports,
      title: '$vuetify.reports.pageTitle',
      permissions: [],
    }
  },
];

// Users Section
createRepositoryCrudRoutes(routes, users);
createRepositoryCrudRoutes(routes, userRoles);
createRepositoryCrudRoutes(routes, userAttributes);

export const customRoutes = routes;
