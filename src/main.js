import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './app';
import router from '../routes'
import './registerServiceWorker'
import {Api} from './services/client';
import moment from 'moment';
import Alert from './components/alert';
import EmptyLayout from './layouts/empty';
import CookieConsent from 'vue-cookieconsent-component';

export const bus = new Vue();

Vue.prototype.$alert = {
  showNotice: false,
  color: 'error',
  timeout: 30000,
  message: null,
};

let timer = setInterval(function() {
  bus.$emit('refresh.tick');
}, 60000);
bus.$on('refresh.clear', () => {
  clearInterval(timer);
  timer = setInterval(function() {
    bus.$emit('refresh.tick');
  }, 60000);
});

router.beforeEach((to, from, next) => {
  bus.$emit('refresh.clear');
  if (to.path != '/login'
      && to.path != '/password-reset-request'
      && to.path != '/password-reset-complete'
      && to.path !='/browser/not-supported'
      && to.path != '/validate'
      && !Api.isLoggedIn()
  ) {
    if (to.fullPath != '/') {
      next({path: '/login', query: {redirect: to.fullPath}});
    } else {
      next({path: '/login'});
    }
    return;
  }
  next();
});

Vue.component("alert", Alert);
Vue.component("empty-layout", EmptyLayout);
Vue.component('cookie-consent', CookieConsent)

export const hasPermission = function (tag) {
  let jwt = JSON.parse(atob(Api.getAccessToken().split('.')[1]));
  let inverted = jwt['permissions.inverted'];
  let tags = jwt['permissions.tags'];
  if (tags.includes(tag)) {
    return !inverted;
  }
  return inverted;
};

Vue.mixin({
  methods: {
    hasPermission: hasPermission,
  },
});

Vue.filter('formatMoney', function(value) {
  if (value) {
    if (value < 0) {
      return "(R" + Math.abs(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +")";
    }
    return "R"+ value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  return "R0.00"
});
Vue.filter('formatBool', function(value) {
  if (value) {
    return "Yes";
  }
  return "No";
});
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD');
  }
});
Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD HH:mm');
  }
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
