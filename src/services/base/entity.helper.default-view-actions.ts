import {translate} from '@/plugins/vuetify';

export const defaultViewActions = (deleteHandler: any, editHandler: any, listHandler: any) => {
  const buttons = [];

  if (deleteHandler) {
    buttons.push(
      {
        icon: 'mdi-delete',
        title: translate('base.entityView.delete'),
        color: 'error',
        callback: (item: any) => {
          deleteHandler(item)
        },
      },
    );
  }

  if (editHandler) {
    buttons.push(
      {
        icon: 'mdi-pencil',
        title: translate('base.entityView.edit'),
        color: 'warning',
        callback: (item: any) => {
          editHandler(item)
        },
      },
    );
  }

  if (listHandler) {
    buttons.push(
      {
        icon: 'mdi-view-list',
        title: translate('base.entityView.list'),
        color: 'info',
        callback: (item: any) => {
          listHandler(item)
        },
      },
    );
  }

  return buttons;
};

