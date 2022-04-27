import {translate} from '@/plugins/base/vuetify';

const noValidation = () => true;

export const validations = {
  required: (optional: boolean) => {
    if (!optional) {
      return (value: any) => { return (!!value && value.length > 0) || translate('$vuetify.validations.required'); }
    }
    return noValidation;
  },
  email: () => {
    return (value: any) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || translate('$vuetify.validations.email');
  },
  pattern: (expression: RegExp, message: string) => {
    if (expression && message) {
      return (value: any) => !value || expression.test(value) || translate(message);
    }
    return noValidation;
  },
  length: (max: number) => {
    if (max) {
      return (value: any) => !value || value.length <= max || translate('$vuetify.validations.length', max);
    }
    return noValidation;
  },
}
