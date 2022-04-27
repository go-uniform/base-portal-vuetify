import Vue from 'vue'
import App from './App.vue'
import router from './router/base'
import vuetify from './plugins/base/vuetify';
import {bus} from '@/services/base/bus';
import {vueBus} from '@/plugins/base/vue-bus';

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  window.dispatchEvent(new ErrorEvent('error', {
    error: err,
  }));
};

bus.set(vueBus);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
