import {translate} from '@/plugins/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultListItemActions = (repository: IRepository<any>, deleteHandler?: any, editHandler?: any, viewHandler?: any) => {
  const actions = [];

  if (deleteHandler) {
    actions.push(
      {
        icon: 'mdi-delete',
        title: translate('base.entityList.delete'),
        color: 'error',
        callback: (item: any) => {
          deleteHandler(item)
        },
      },
    );
  }

  if (editHandler) {
    actions.push(
      {
        icon: 'mdi-pencil',
        title: translate('base.entityList.edit'),
        color: 'warning',
        callback: (item: any) => {
          editHandler(item)
        },
      },
    );
  }

  if (viewHandler) {
    actions.push(
      {
        icon: 'mdi-eye',
        title: translate('base.entityList.view'),
        color: 'info',
        callback: (item: any) => {
          viewHandler(item)
        },
      },
    );
  }

  return actions;
};
