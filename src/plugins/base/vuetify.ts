import Vue from 'vue';
import Vuetify from 'vuetify';
import moment from 'moment';
import {bus} from '@/services/base/bus';
import {languages,locales} from '@/plugins/locales';
import theme from '@/plugins/theme';

Vue.use(Vuetify);

// set the language based on browser localStorage flag
let currentLang = 'en';
if (window && window.localStorage) {
  const lang = window.localStorage.getItem('lang') ?? 'en';
  if (languages.filter((language: any) => language.value === lang).length > 0) {
    currentLang = lang;
  }
}

const instance = new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'sm'
  },
  theme: theme,
  lang: {
    locales: locales,
    current: currentLang,
  },
});

export const kebabCase = (str: any) => {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map((x: any) => x.toLowerCase()).join('-');
};

export const camelize = (str: string) => {
  return str.replace('-', ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export const loadingStart = (timeout: number, text: string, ...args: any[]) => {
  bus.publish('loading.start', {
    text: translate(text, ...args),
    timeout: timeout,
  });
};

export const loadingStop = () => {
  bus.publish('loading.stop', {});
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
    title: '$vuetify.app.deleteConfirmationTitle',
    body: '$vuetify.app.deleteConfirmationMessage',
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
  if (text.startsWith('$vuetify.')) {
    args = args.map(arg => {
      if (arg && arg.startsWith('$vuetify.')) {
        return translate(arg);
      }
      return arg;
    });
    const translated = instance.framework.lang.t(text, ...args);
    if (translated !== text && !translated.startsWith('$vuetify.')) {
      text = translated;
    } else {
      window.dispatchEvent(new ErrorEvent('error', {
        error: new Error(`[Vuetify] Translation key "${text}" not found in fallback`),
      }));
    }
    return text;
  }
  return formatString(text, ...args);
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

export const formatDatetime = (value: any) => {
  return moment(value).local().format('YYYY-MM-DD HH:mm:ss');
};
Vue.filter('datetime', (value: any) => {
  return formatDatetime(value);
});

// set main application title
document.title = translate('$vuetify.app.title');

export default instance;
