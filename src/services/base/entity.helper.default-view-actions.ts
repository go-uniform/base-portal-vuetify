import {translate} from '@/plugins/base/vuetify';

export const defaultViewActions = (deleteHandler?: any, editHandler?: any, listHandler?: any) => {
  const actions = [];

  if (deleteHandler) {
    actions.push(
      {
        icon: 'mdi-delete',
        title: translate('$vuetify.entityView.delete'),
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
        title: translate('$vuetify.entityView.edit'),
        color: 'warning',
        callback: (item: any) => {
          editHandler(item)
        },
      },
    );
  }

  if (listHandler) {
    actions.push(
      {
        icon: 'mdi-view-list',
        title: translate('$vuetify.entityView.list'),
        color: 'info',
        callback: (item: any) => {
          listHandler(item)
        },
      },
    );
  }

  return actions;
};

