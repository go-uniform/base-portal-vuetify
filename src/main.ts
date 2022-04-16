import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {bus} from '@/services/bus';
import {vueBus} from '@/plugins/vue-bus';

Vue.config.productionTip = false

bus.set(vueBus);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
