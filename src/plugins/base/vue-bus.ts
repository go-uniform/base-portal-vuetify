import Vue from 'vue';

export const vueBus = {
  vue: new Vue(),

  subscribe: (event: string | string[], callback: any): void => {
    vueBus.vue.$on(event, callback);
  },

  unsubscribe: (event?: string | string[], callback?: any): void => {
    vueBus.vue.$off(event, callback);
  },

  publish: (event: string, args: any): void => {
    vueBus.vue.$emit(event, args);
  },

};
