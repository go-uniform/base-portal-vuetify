import {translate} from '@/plugins/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultListCrumbs = (repository: IRepository<any>) => {
  return [
    {
      icon: translate('base.home.icon'),
      title: translate('base.home.pageTitle'),
      location: '/',
    },
    {
      title: translate(repository.title.plural),
    },
  ];
};
