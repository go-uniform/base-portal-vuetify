import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './sass/main.scss';
import 'vuetify/dist/vuetify.min.css';
import {bus} from '@/services/bus';
import vuetify from '@/plugins/vuetify';
import {vueBus} from '@/plugins/vue-bus';
import Toast from '@/components/Toast.vue';

Vue.config.productionTip = false;

export const format = (text: string, args: any[]) => {
    return text.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};

Vue.mixin({
  methods: {
    format,
  },
});

bus.set(vueBus);

Vue.component('Toast', Toast);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

