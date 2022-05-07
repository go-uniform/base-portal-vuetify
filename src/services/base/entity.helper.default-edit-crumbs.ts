import {translate} from '@/plugins/base/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultEditCrumbs = (repository: IRepository<any>, id: string | null | undefined) => {
  if (id) {
    return [
      {
        icon: translate('$vuetify.home.icon'),
        title: translate('$vuetify.home.pageTitle'),
        location: '/',
      },
      {
        title: translate(repository.title.plural),
        location: repository.listPage,
      },
      {
        title: translate('$vuetify.entityEdit.view'),
        location: `${translate(repository.viewPage,id)}`,
      },
      {
        title: translate('$vuetify.entityEdit.edit'),
      },
    ];
  }
  return [
    {
      icon: translate('$vuetify.home.icon'),
      title: translate('$vuetify.home.pageTitle'),
      location: '/',
    },
    {
      title: translate(repository.title.plural),
      location: repository.listPage,
    },
    {
      title: translate('$vuetify.entityEdit.new'),
    },
  ];
};
