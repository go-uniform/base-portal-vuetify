import {translate} from '@/plugins/base/vuetify';

export const defaultViewActions = (deleteHandler?: any, editHandler?: any, listHandler?: any, newLocation?: string) => {
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

  if (newLocation) {
    actions.push(
      {
        icon: 'mdi-plus-box',
        color: 'success',
        title: translate('$vuetify.entityView.new'),
        location: newLocation,
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

