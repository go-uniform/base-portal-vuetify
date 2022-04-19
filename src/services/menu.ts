import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {IRepository} from '@/services/base/global.interfaces';
import {formatString} from '@/plugins/vuetify';

const generateMenuItem = <T>(repository: IRepository<T>): object => {
  return {
    title: formatString(repository.title.plural),
    location: repository.listPage,
  };
}

export const mainMenuItems = [
  {
    title: formatString('custom.home.pageTitle'),
    icon: 'mdi-home',
    location: '/'
  },
  {
    title: formatString('Users'),
    icon: 'mdi-account',
    children: [
      generateMenuItem(users),
      generateMenuItem(userRoles),
    ],
  },
]
