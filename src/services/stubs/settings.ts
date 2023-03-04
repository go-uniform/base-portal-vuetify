import {
  baseRestItemStub,
  baseRestListStub,
  baseStoreLoad,
  baseStoreSave,
  stubScenario
} from '@/services/base/stub';
import {ISettingsGroup, Settings, settings} from '@/services/repositories/settings';
import {EnumValueType} from '@/services/base/global.enums';

export const SettingsDefinition: ISettingsGroup[] = [
  {
    key: 'general',
    name: 'General',
    description: 'Widespread settings that affect the entire system.',
    values: [
      {
        key: 'decimalPlaces',
        name: 'Decimal Places',
        description: 'The amount of decimal places that the system should show for any decimal values.',
        type: EnumValueType.Number,
        optional: true,
      }
    ],
  },
  {
    key: 'health',
    name: 'Health',
    description: 'Silence any of the built-in system health check rules, in case of false-alarms.',
    values: [
      {
        key: 'silenceDistributionServiceCheck',
        name: 'Silence Distribution Service Check',
        description: 'Silence any failures caused by the distribution service check rule.',
        type: EnumValueType.Boolean,
      }
    ],
  },
  {
    key: 'authentication',
    name: 'Authentication',
    description: 'Settings specifically pertaining to system authentication policies.',
    values: [
      {
        key: 'resetLinkExpiryHours',
        name: 'Reset Link Expiry Hours',
        description: 'The amount of time after which the system will invalidate a given reset link for security reasons.',
        type: EnumValueType.Number,
      }
    ],
  },
];

export let SettingsValues: Settings = baseStoreLoad({
  general: {
    decimalPlaces: 2,
  },
  health: {
    silenceDistributionServiceCheck: false,
  },
  authentication: {
    resetLinkExpiryHours: 4,
  },
}, settings.slug);

const stub = {
  repository: settings,
  handlers: {
    'OPTIONS /settings': baseRestListStub(settings.slug, (input: string, init: RequestInit, resolve: any, reject: any) => {
      SettingsDefinition.forEach((group, index) => {
        const groupSettings = SettingsValues[group.key] || {};
        group.values.forEach((value, subIndex) => {
          value.value = groupSettings[value.key] || null;
        });
      });
      resolve(stubScenario(SettingsDefinition))
    }),
    'GET /settings': baseRestItemStub(settings.slug, (input: string, init: RequestInit, resolve: any, reject: any) => {
      resolve(stubScenario(SettingsValues))
    }),
    'POST /settings': baseRestItemStub(settings.slug, (input: string, init: RequestInit, resolve: any, reject: any) => {
      let scenario = stubScenario({}, 500, new Headers({
        'Message': '$vuetify.errors.general'
      }));

      let body: any = null;
      if (init && init.body) {
        body = JSON.parse(init.body.toString());
      }

      if (body) {
        SettingsValues = body;
        baseStoreSave(SettingsValues, settings.entity)
        scenario = stubScenario(body);
      }
      resolve(scenario);
    }),
  },
  initialData: SettingsValues,
};

export const StubSettings = stub;
