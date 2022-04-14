import Vue from 'vue'
import VueRouter, {Route, RouteConfig} from 'vue-router';
import Home from '../views/Home.vue'
import {NavigationGuard} from 'vue-router/types/router';
import {auth} from '@/services/auth';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      permissions: [],
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      public: true,
    }
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('../views/PasswordReset.vue'),
    meta: {
      public: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue'),
    meta: {
      public: true,
    }
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('../views/Otp.vue'),
    meta: {
      public: true,
    }
  },
  {
    path: '/users/view/:id',
    name: 'users-view',
    component: () => import('../views/UsersView.vue'),
  },
  {
    path: '/users/edit/:id',
    name: 'users-edit',
    component: () => import('../views/UsersEdit.vue'),
  },
  {
    path: '/users/add',
    name: 'users-add',
    component: () => import('../views/UsersEdit.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/user-roles',
    name: 'users-roles',
    component: () => import('../views/UserRoles.vue'),
  },
  {
    path: '/user-roles/view/:id',
    name: 'user-roles-view',
    component: () => import('../views/UserRolesView.vue'),
  },
  {
    path: '/user-roles/edit/:id',
    name: 'user-roles-edit',
    component: () => import('../views/UserRolesEdit.vue'),
  },
  {
    path: '/user-roles/add',
    name: 'user-roles-add',
    component: () => import('../views/UserRolesEdit.vue'),
  },
  {
    path: '/policies/cookie',
    name: 'cookie-policy',
    component: () => import('../views/CookiePolicy.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      public: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const AuthGuard: NavigationGuard = (to, from, next) => {
  if (to.name !== 'login' && !(to.meta && to.meta.public)) {
    if (!auth.isAuthenticated()) {
      let query = {};
      if (to.path && to.path !== '/') {
        query = { redirect: encodeURI(to.fullPath) };
      }
      next({ name: 'login', query: query });
    }
  }
  next();
};
router.beforeEach(AuthGuard);

export default router
