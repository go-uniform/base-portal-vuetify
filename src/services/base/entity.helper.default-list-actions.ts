import {translate} from '@/plugins/base/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultListActions = (repository: IRepository<any>) => {
  if (repository.disableCreation) {
    return [];
  }
  return [
    {
      icon: 'mdi-plus-box',
      color: 'success',
      title: translate('$vuetify.entityList.new'),
      location: `${repository.addPage}`,
    },
  ];
};

