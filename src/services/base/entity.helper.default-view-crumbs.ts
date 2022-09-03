import {translate} from '@/plugins/base/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultViewCrumbs = (repository: IRepository<any>) => {
  const crumbs: any = [
    {
      icon: translate('$vuetify.home.icon'),
      title: translate('$vuetify.home.pageTitle'),
      location: '/',
    }
  ];

  if (repository.listPage != '/') {
    crumbs.push({
      title: translate(repository.title.plural),
      location: repository.listPage,
    });
  }

  crumbs.push({
    title: translate('$vuetify.entityView.view'),
  });

  return crumbs;
};
