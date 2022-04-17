import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/userRoles';
import {IRepository} from '@/services/base/global.interfaces';

const generateMenuItem = <T>(repository: IRepository<T>): object => {
  return {
    title: repository.title.plural,
    location: repository.listPage,
  };
}

export const mainMenuItems = [
  {
    title: 'Home',
    icon: 'mdi-home',
    location: '/'
  },
  {
    title: 'Users',
    icon: 'mdi-account',
    children: [
      generateMenuItem(users),
      generateMenuItem(userRoles),
    ],
  },
]
