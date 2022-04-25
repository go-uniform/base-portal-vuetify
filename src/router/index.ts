import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue'
import {NavigationGuard} from 'vue-router/types/router';
import {auth} from '@/services/base/auth';
import {crudRoutes} from '@/services/crud';
import {loadingStop, toastError, translate} from '@/plugins/vuetify';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'base.home.pageTitle',
      permissions: [],
    }
  },
  {
    path: '/reports/example1',
    name: 'report-example1',
    component: () => import('../views/ReportView.vue'),
    meta: {
      title: 'custom.reports.example1.title',
      permissions: [],
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'base.login.pageTitle',
      public: true,
    }
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('../views/PasswordReset.vue'),
    meta: {
      title: 'base.passwordReset.pageTitle',
      public: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue'),
    meta: {
      title: 'base.logout.pageTitle',
      public: true,
    }
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('../views/Otp.vue'),
    meta: {
      title: 'base.otp.pageTitle',
      public: true,
    }
  },
  {
    path: '/policies/cookie',
    name: 'cookie-policy',
    component: () => import('../views/CookiePolicy.vue'),
    meta: {
      title: 'base.cookieConsent.pageTitle',
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
    title: 'base.notFound.pageTitle',
    public: true
  }
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const UnloadLoadingIndicator: NavigationGuard = (to, from, next) => {
  // stop any active loading indicator upon a navigation redirect since a new page is now active
  loadingStop();
  next();
}
router.beforeEach(UnloadLoadingIndicator);

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
  let title = translate('base.app.title');
  if (to.meta && to.meta.title) {
    if (to.meta.repository) {
      title = `${to.meta.title} | ${title}`;
    } else {
      title = `${translate(to.meta.title)} | ${title}`;
    }
  }
  document.title = title;
  next();
};
router.beforeEach(PageTitle);

export default router
