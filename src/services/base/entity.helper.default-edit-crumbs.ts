import {translate} from '@/plugins/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultEditCrumbs = (repository: IRepository<any>, id: string | null | undefined) => {
  if (id) {
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
        title: translate('base.entityEdit.view'),
        location: `${repository.viewPagePrefix}/${id}`,
      },
      {
        title: translate('base.entityEdit.edit'),
      },
    ];
  }
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
      title: translate('base.entityEdit.new'),
    },
  ];
};
