import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router';
import {NavigationGuard} from 'vue-router/types/router';
import {auth} from '@/services/base/auth';
import {customRoutes} from '@/router/routes';
import {loadingStop, translate} from '@/plugins/base/vuetify';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../../views/base/Login.vue'),
    meta: {
      title: '$vuetify.login.pageTitle',
      public: true,
    }
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('../../views/base/PasswordReset.vue'),
    meta: {
      title: '$vuetify.passwordReset.pageTitle',
      public: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../../views/base/Logout.vue'),
    meta: {
      title: '$vuetify.logout.pageTitle',
      public: true,
    }
  },
  {
    path: '/otp',
    name: 'otp',
    component: () => import('../../views/base/Otp.vue'),
    meta: {
      title: '$vuetify.otp.pageTitle',
      public: true,
    }
  },
  {
    path: '/policies/cookie',
    name: 'cookie-policy',
    component: () => import('../../views/base/CookiePolicy.vue'),
    meta: {
      title: '$vuetify.cookieConsent.pageTitle',
      public: true,
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../../views/base/Account.vue'),
    meta: {
      title: '$vuetify.account.pageTitle',
    }
  },
  {
    path: '/account/edit',
    name: 'account-edit',
    component: () => import('../../views/base/AccountEdit.vue'),
    meta: {
      title: '$vuetify.accountEdit.pageTitle',
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../../views/base/Settings.vue'),
    meta: {
      title: '$vuetify.settings.pageTitle',
    }
  },
  {
    path: '/development',
    name: 'development',
    component: () => import('../../views/base/Development.vue'),
    meta: {
      title: '$vuetify.development.pageTitle',
      permissions: [],
    }
  },
];

routes.push(...customRoutes)

routes.push({
  path: '*',
  name: 'not-found',
  component: () => import('../../views/base/NotFound.vue'),
  meta: {
    title: '$vuetify.notFound.pageTitle',
    public: true,
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
  let title = translate('$vuetify.app.title');
  if (to.meta && to.meta.title) {
    if (to.meta && to.meta.title.startsWith('$vuetify')) {
      title = `${translate(to.meta.title)} | ${title}`;
    } else {
      title = `${to.meta.title} | ${title}`;
    }
  }
  document.title = title;
  next();
};
router.beforeEach(PageTitle);

export default router
