import {createRepositoryCrudRoutes} from '@/services/base/entity.crud';
import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {userAttributes} from '@/services/repositories/user-attributes';
import {RouteConfig} from 'vue-router';
import Home from '@/views/base/Home.vue';

// custom/override routes should be added here
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '$vuetify.home.pageTitle',
      permissions: [],
    }
  },
  {
    path: '/reports/example1',
    name: 'report-example1',
    component: () => import('../views/base/ReportView.vue'),
    meta: {
      title: '$vuetify.reports.example1.title',
      permissions: [],
    }
  },
];

// Users Section
createRepositoryCrudRoutes(routes, users);
createRepositoryCrudRoutes(routes, userRoles);
createRepositoryCrudRoutes(routes, userAttributes);

export const customRoutes = routes;
