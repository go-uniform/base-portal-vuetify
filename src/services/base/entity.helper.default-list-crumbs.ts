import {translate} from '@/plugins/base/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultListCrumbs = (repository: IRepository<any>) => {
  return [
    {
      icon: translate('$vuetify.home.icon'),
      title: translate('$vuetify.home.pageTitle'),
      location: '/',
    },
    {
      title: translate(repository.title.plural),
    },
  ];
};
