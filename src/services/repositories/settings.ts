import {EnumHttpMethod, EnumValueType} from '@/services/base/global.enums';
import {baseRestItem, baseRestList} from '@/services/base/base';
import {IItem, IList} from '@/services/base/global.interfaces';

export type Settings = { [key: string]: any };

export interface ISettingsValue {
  key: string;
  name: string;
  description?: string;
  type: EnumValueType;
  multiple?: boolean;
  value?: any;
  optional?: boolean;
}

export interface ISettingsGroup {
  key: string;
  name: string;
  description?: string;
  values: ISettingsValue[],
}

export const settings = {
  entity: 'settings',
  slug: 'settings',

  definition: (): Promise<IList<ISettingsGroup>> => {
    return baseRestList<ISettingsGroup>(null, null, EnumHttpMethod.Options, `settings`);
  },

  get: (): Promise<IItem<Settings>> => {
    return baseRestItem<Settings>(null, null, EnumHttpMethod.Get, `settings`);
  },

  set: (value: Settings) => {
    return baseRestItem<null>(null, null, EnumHttpMethod.Post, `settings`, value);
  },
}
