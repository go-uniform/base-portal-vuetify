import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import af from '@/locale/af';

Vue.use(Vuetify);

const instance = new Vuetify({
  lang: {
    locales: { af },
    current: 'af',
  },
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});

// __ is shorthand for format string function
export const __ = (text: string, ...args: any[]) => {
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
    __,
  },
});

Vue.filter('format', (text: string, ...args: any[]) => {
  __(text, args);
});

export default instance;
