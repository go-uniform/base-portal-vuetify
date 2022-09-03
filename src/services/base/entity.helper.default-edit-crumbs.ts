import {translate} from '@/plugins/base/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultEditCrumbs = (repository: IRepository<any>, id: string | null | undefined) => {
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

  if (id) {
    crumbs.push(
      {
        title: translate('$vuetify.entityEdit.view'),
        location: `${translate(repository.viewPage,id)}`,
      }
    );
    crumbs.push(
      {
        title: translate('$vuetify.entityEdit.edit'),
      }
    );
  } else {
    crumbs.push(
      {
        title: translate('$vuetify.entityEdit.new'),
      }
    );
  }

  return crumbs;
};
