import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {translate} from '@/plugins/base/vuetify';
import {userAttributes} from '@/services/repositories/user-attributes';
import {createMenuItem} from '@/services/base/entity.crud';

export const mainMenuItems = [
  {
    title: translate('$vuetify.home.pageTitle'),
    icon: translate('$vuetify.home.icon'),
    location: '/'
  },
  {
    title: translate('$vuetify.menu.reports.title'),
    icon: translate('$vuetify.menu.reports.icon'),
    children: [
      {
        title: translate('$vuetify.menu.reports.example1.title'),
        location: '/reports/example1'
      }
    ]
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
