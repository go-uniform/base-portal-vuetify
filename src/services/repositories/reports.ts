import {Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'reports';
const slug = entity;

export interface Report {
  id: string;
  urlThumbnail?: string;
  urlView: string;
  urlEdit?: string;
  title: string;
  description?: string;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<Report>(slug, {}, {
  freeTextSearch: false,
  createdAtFilterable: false,
});

repository.addField('title', {
  label: '',
  type: EnumValueType.Text,
});
repository.addField('urlThumbnail', {
  label: '',
  type: EnumValueType.Text,
  readonly: true,
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

export const reports = repository;
