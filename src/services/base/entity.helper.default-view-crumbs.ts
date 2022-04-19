import {translate} from '@/plugins/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultViewCrumbs = (repository: IRepository<any>) => {
  return [
    {
      icon: 'mdi-home',
      title: translate('base.home.pageTitle'),
      location: '/',
    },
    {
      title: translate(repository.title.plural),
      location: repository.listPage,
    },
    {
      title: translate('base.entityView.view'),
    },
  ];
};
