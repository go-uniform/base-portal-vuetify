import Vue from 'vue'
import VueRouter, {Route, RouteConfig} from 'vue-router';
import Home from '../views/Home.vue'
import {NavigationGuard} from 'vue-router/types/router';
import {auth} from '@/services/base/auth';
import {crudRoutes} from '@/services/crud';

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
    path: '/policies/cookie',
    name: 'cookie-policy',
    component: () => import('../views/CookiePolicy.vue'),
    meta: {
      public: true
    }
  },
];

routes.push(...crudRoutes)

routes.push({
  path: '*',
  name: 'not-found',
  component: () => import('../views/NotFound.vue'),
  meta: {
    public: true
  }
});

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
