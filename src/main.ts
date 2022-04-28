import Vue from 'vue'
import App from './App.vue'
import router from './router/base'
import vuetify from './plugins/base/vuetify';
import {bus} from '@/services/base/bus';
import {vueBus} from '@/plugins/base/vue-bus';
import {setApiFetchHandler} from '@/services/base/base';
import {baseStubHandlerAppend, baseStubHandlerRoutine} from '@/services/base/stub';
import stubHandlers from '@/services/stubs';

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  window.dispatchEvent(new ErrorEvent('error', {
    error: err,
  }));
};

if (process.env.VUE_APP_USE_STUBS !== undefined) {
  const stubs = process.env.VUE_APP_USE_STUBS.toLowerCase();
  if (stubs === 'true' || stubs === '1') {
    console.log('using stubs handler');
    setApiFetchHandler(baseStubHandlerRoutine);
    stubHandlers.forEach((stubHandler) => {
      baseStubHandlerAppend(stubHandler);
    })
  }
}

bus.set(vueBus);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
