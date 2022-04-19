import {translate} from '@/plugins/vuetify';

const noValidation = () => true;

export const validations = {
  required: (optional: boolean) => {
    if (!optional) {
      return (value: any) => !!value || translate('custom.validations.required')
    }
    return noValidation;
  },
  email: () => {
    return (value: any) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || translate('custom.validations.email');
  },
  pattern: (expression: RegExp, message: string) => {
    if (expression && message) {
      return (value: any) => !value || expression.test(value) || translate(message);
    }
    return noValidation;
  },
  length: (max: number) => {
    if (max) {
      return (value: any) => !value || value.length <= max || translate('custom.validations.length', max);
    }
    return noValidation;
  },
}
