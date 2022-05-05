import {translate} from '@/plugins/base/vuetify';

export const accountMenuItems = [
  {
    title: translate('$vuetify.account.pageTitle'),
    icon: translate('$vuetify.account.icon'),
    location: '/account'
  },
  {
    title: translate('$vuetify.settings.pageTitle'),
    icon: translate('$vuetify.settings.icon'),
    location: '/settings'
  },
]
