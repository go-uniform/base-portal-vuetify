import {translate} from '@/plugins/base/vuetify';
import {createMenuItem} from '@/services/base/entity.crud';

import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {userAttributes} from '@/services/repositories/user-attributes';

export const mainMenuItems = [
  {
    title: translate('$vuetify.home.pageTitle'),
    icon: translate('$vuetify.home.icon'),
    location: '/'
  },
  {
    title: translate('$vuetify.menu.reports.title'),
    icon: translate('$vuetify.menu.reports.icon'),
    location: '/reports'
  },
  {
    title: translate('$vuetify.menu.events.title'),
    icon: translate('$vuetify.menu.events.icon'),
    location: '/events'
  },
  {
    title: translate('$vuetify.development.pageTitle'),
    icon: translate('$vuetify.development.icon'),
    location: '/development'
  },
  {
    title: translate('$vuetify.menu.users.title'),
    icon: translate('$vuetify.menu.users.icon'),
    children: [
      createMenuItem(users),
      createMenuItem(userRoles),
      createMenuItem(userAttributes),
    ],
  },
]
