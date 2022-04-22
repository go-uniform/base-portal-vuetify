import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {IRepository} from '@/services/base/global.interfaces';
import {translate} from '@/plugins/vuetify';
import {userAttributes} from '@/services/repositories/user-attributes';

const generateMenuItem = <T>(repository: IRepository<T>): object => {
  return {
    title: translate(repository.title.plural),
    location: repository.listPage,
  };
}

export const mainMenuItems = [
  {
    title: translate('base.home.pageTitle'),
    icon: translate('base.home.icon'),
    location: '/'
  },
  {
    title: translate('custom.menu.users.title'),
    icon: translate('custom.menu.users.icon'),
    group: '/user',
    children: [
      generateMenuItem(users),
      generateMenuItem(userRoles),
      generateMenuItem(userAttributes),
    ],
  },
]
