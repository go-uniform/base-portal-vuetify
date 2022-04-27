import {translate} from '@/plugins/base/vuetify';
import {IRepository} from '@/services/base/global.interfaces';

export const defaultEditActions = (repository: IRepository<any>, id: string, saveHandler: any) => {
  let cancelUrl = repository.listPage;
  if (id) {
    cancelUrl = `${repository.viewPagePrefix}/${id}`;
  }

  const actions = [];

  if (saveHandler) {
    actions.push(
      {
        icon: 'mdi-content-save',
        color: 'success',
        title: translate('$vuetify.app.save'),
        callback: (item: any) => {
          saveHandler(item);
        }
      },
    );
  }

  actions.push(
    {
      icon: 'mdi-close-circle',
      class: 'white--text',
      color: 'grey',
      title: translate('$vuetify.app.cancel'),
      location: cancelUrl,
      callback: (item: any) => {
        // do nothing since location will redirect us
      }
    },
  );

  return actions;
};

