import {translate} from '@/plugins/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultListActions = (repository: IRepository<any>) => {
  if (repository.disableCreation) {
    return [];
  }
  return [
    {
      icon: 'mdi-plus-box',
      color: 'success',
      title: translate('base.entityList.new'),
      location: `${repository.addPage}`,
    },
  ];
};

