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
    name: 'dashboard-list',
    component: () => import('../views/base/DashboardView.vue'),
    meta: {
      repository: dashboards,
      title: '$vuetify.home.pageTitle',
      permissions: [],
    }
  },
  {
    path: '/dashboards/edit/:id',
    name: 'dashboard-edit',
    component: () => import('../views/base/DashboardEdit.vue'),
    meta: {
      repository: dashboards,
      title: 'Edit Dashboard',
      permissions: [],
    }
  },
  {
    path: '/dashboards/add',
    name: 'dashboard-add',
    component: () => import('../views/base/EntityEdit.vue'),
    meta: {
      repository: dashboards,
      title: 'New Dashboard',
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
    path: '/reports/view/:id',
    name: 'report-view',
    component: () => import('../views/base/ReportView.vue'),
    meta: {
      repository: reports,
      title: 'View Report',
      permissions: [],
    }
  },
  {
    path: '/reports/edit/:id',
    name: 'report-edit',
    component: () => import('../views/base/ReportEdit.vue'),
    meta: {
      repository: reports,
      title: 'Edit Report',
      permissions: [],
    }
  },
  {
    path: '/reports/add',
    name: 'report-add',
    component: () => import('../views/base/EntityEdit.vue'),
    meta: {
      repository: reports,
      title: 'New Report',
      permissions: [],
    }
  },
];

// Users Section
createRepositoryCrudRoutes(routes, users);
createRepositoryCrudRoutes(routes, userRoles);
createRepositoryCrudRoutes(routes, userAttributes);

export const customRoutes = routes;
