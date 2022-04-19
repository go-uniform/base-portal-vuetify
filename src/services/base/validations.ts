import {formatString} from '@/plugins/vuetify';

const noValidation = () => true;

export const validations = {
  required: (optional: boolean) => {
    if (!optional) {
      return (value: any) => !!value || formatString('custom.validations.required')
    }
    return noValidation;
  },
  email: () => {
    return (value: any) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || formatString('custom.validations.email');
  },
  pattern: (expression: RegExp, message: string) => {
    if (expression && message) {
      return (value: any) => !value || expression.test(value) || formatString(message);
    }
    return noValidation;
  },
  length: (max: number) => {
    if (max) {
      return (value: any) => !value || value.length <= max || formatString('custom.validations.length', max);
    }
    return noValidation;
  },
}
