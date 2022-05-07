import {Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'dashboards';
const slug = entity;

export interface Dashboard {
  id: string;
  urlView: string;
  urlEdit?: string;
  title: string;
  description?: string;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<Dashboard>(slug, {}, {
  freeTextSearch: false,
  listPage: `/`,
  viewPage: `/#{0}`,
});

repository.addField('title', {
  label: '',
  type: EnumValueType.Text,
});
repository.addField('urlView', {
  label: '',
  type: EnumValueType.Text,
  readonly: true,
});
repository.addField('urlEdit', {
  label: '',
  type: EnumValueType.Text,
  readonly: true,
});
repository.addField('description', {
  label: '',
  type: EnumValueType.TextArea,
  optional: true,
});

repository.setHeaders([
  {
    fieldKey: 'title',
  },
  {
    fieldKey: 'createdAt',
    align: EnumHeaderAlign.End,
  },
]);

repository.addSection(
  new Section(`$vuetify.${entity}.sections.general`, [
    'id',
    'title',
    'description',
    'modifiedAt',
    'createdAt',
  ])
);

repository.bulkActions = [
  {
    color: 'error',
    icon: 'mdi-delete',
    title: '$vuetify.entityList.delete',
    key: 'delete'
  }
];

export const dashboards = repository;
