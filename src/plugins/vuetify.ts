import Vue from 'vue';
import Vuetify from 'vuetify';
import af from '@/locale/af';
import en from '@/locale/en';
import moment from 'moment';

Vue.use(Vuetify);

const instance = new Vuetify({
  theme: {
    dark: true,
  },
  lang: {
    locales: { en, af },
    current: 'en',
  },
});

// __ is shorthand for format string function
export const formatString = (text: string, ...args: any[]) => {
  let key = `${text}`;
  if (text.startsWith('$vuetify.')) {
    key = `${text}`;
  } else if (text.startsWith('custom.')) {
    key = `$vuetify.${text}`;
  } else if (text.startsWith('raw.')) {
      key = `$vuetify.${text}`;
  } else {
    key = `$vuetify.raw.${text}`;
  }
  const translated = instance.framework.lang.t(key);
  if (translated !== key) {
    text = translated;
  }
  if (args != null && args.length === 1 && args[0].isArray) {
    args = args[0];
  }
  return text.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};

Vue.mixin({
  methods: {
    __: formatString,
  },
});

Vue.filter('format', (text: string, ...args: any[]) => {
  formatString(text, args);
});

export const formatBoolean = (value: any) => {
  return value ? 'Yes' : 'No';
};
Vue.filter('boolean', (value: any) => {
  return formatBoolean(value);
});

export const formatDate = (value: any) => {
  return moment(value).local().format('YYYY-MM-DD');
};
Vue.filter('date', (value: any) => {
  return formatDate(value);
});

export const formatDatetime = (value: any) => {
  return moment(value).local().format('YYYY-MM-DD HH:mm:ss');
};
Vue.filter('datetime', (value: any) => {
  return formatDatetime(value);
});

export default instance;
