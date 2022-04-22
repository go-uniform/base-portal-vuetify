import Vue from 'vue';
import Vuetify from 'vuetify';
import af from '@/locale/af';
import en from '@/locale/en';
import moment from 'moment';
import {bus} from '@/services/base/bus';

Vue.use(Vuetify);

// remember to import these languages and add to Vuetify locales if you add more
export const languages = [
  {
    value: 'en',
    text: 'English',
  },
  {
    value: 'af',
    text: 'Afrikaans',
  }
];

// set the language based on browser localStorage flag
let currentLang = 'en';
if (window && window.localStorage) {
  const lang = window.localStorage.getItem('lang') ?? 'en';
  if (languages.filter(language => language.value === lang).length > 0) {
    currentLang = lang;
  }
}

const instance = new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'sm'
  },
  theme: {
    dark: true,
  },
  lang: {
    locales: {en, af},
    current: currentLang,
  },
});

export const kebabCase = (str: any) => {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((x: any) => x.toLowerCase()).join('-');
};

export const toastError = (text: string, ...args: any[]) => {
  bus.publish('toast.show', {
    type: 'error',
    message: translate(text, ...args),
  });
};

export const toastSuccess = (text: string, ...args: any[]) => {
  bus.publish('toast.show', {
    type: 'success',
    message: translate(text, ...args),
  });
};

export const toastCustom = (type: string, text: string, ...args: any[]) => {
  bus.publish('toast.show', {
    type: type,
    message: translate(text, ...args),
  });
};

export const deleteConfirmation = (callback: any) => {
  bus.publish('confirm', {
    callback: callback,
    title: 'base.app.deleteConfirmationTitle',
    body: 'base.app.deleteConfirmationMessage',
    options: {
      color: 'error'
    },
  });
};

export const confirmation = (callback: any, title: string, body: string, options: any = {}) => {
  bus.publish('confirm', {
    callback: callback,
    title: title,
    body: body,
    options: options,
  });
};

export const formatString = (text: string, ...args: any[]) => {
  if (args != null && args.length === 1 && args[0].isArray) {
    args = args[0];
  }
  return text.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};

export const translate = (text: string | null | undefined, ...args: any[]): string => {
  if (!text) {
    return '';
  }
  let key = null;
  if (text.startsWith('$vuetify.')) {
    key = `${text}`;
  } else if (text.startsWith('base.')) {
    key = `$vuetify.${text}`;
  } else if (text.startsWith('custom.')) {
    key = `$vuetify.${text}`;
  }
  if (key) {
    const translated = instance.framework.lang.t(key, ...args);
    if (translated !== key && !translated.startsWith('$vuetify.')) {
      text = translated;
    }
  }
  return text;
};

export const analyticsEventPush = (topic: string, options?: any) => {
  if ((window as any).gtag) {
    (window as any).gtag('event', topic, options);
  }
};

Vue.mixin({
  methods: {
    formatString: formatString,
    translate: translate,
    kebabCase: kebabCase,
    analyticsEventPush: analyticsEventPush,
  },
});

Vue.filter('analyticsEventPush', (topic: string, options: any) => {
  analyticsEventPush(topic, options);
});

Vue.filter('translate', (text: string, ...args: any[]) => {
  translate(text, args);
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

// set main application title
document.title = translate('base.app.title');

export default instance;
