import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {IRepository} from '@/services/base/global.interfaces';
import {translate} from '@/plugins/vuetify';

const generateMenuItem = <T>(repository: IRepository<T>): object => {
  return {
    title: translate(repository.title.plural),
    location: repository.listPage,
  };
}

export const mainMenuItems = [
  {
    title: translate('base.home.pageTitle'),
    icon: 'mdi-home',
    location: '/'
  },
  {
    title: translate('Users'),
    icon: 'mdi-account',
    children: [
      generateMenuItem(users),
      generateMenuItem(userRoles),
    ],
  },
]
