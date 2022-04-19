import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue'
import {NavigationGuard} from 'vue-router/types/router';
import {auth} from '@/services/base/auth';
import {crudRoutes} from '@/services/crud';
import {translate} from '@/plugins/vuetify';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'custom.home.pageTitle',
      permissions: [],
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'custom.login.pageTitle',
      public: true,
    }
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('../views/PasswordReset.vue'),
    meta: {
      title: 'custom.passwordReset.pageTitle',
      public: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue'),
    meta: {
      title: 'custom.logout.pageTitle',
      public: true,
    }
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('../views/Otp.vue'),
    meta: {
      title: 'custom.otp.pageTitle',
      public: true,
    }
  },
  {
    path: '/policies/cookie',
    name: 'cookie-policy',
    component: () => import('../views/CookiePolicy.vue'),
    meta: {
      title: 'custom.cookieConsent.pageTitle',
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
    title: 'custom.notFound.pageTitle',
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

const PageTitle: NavigationGuard = (to, from, next) => {
  let title = translate('custom.app.title');
  if (to.meta && to.meta.title) {
    if (!to.meta.repository) {
      title = `${translate(to.meta.title)} | ${title}`;
    }
  }
  document.title = title;
  next();
};
router.beforeEach(PageTitle);

export default router
