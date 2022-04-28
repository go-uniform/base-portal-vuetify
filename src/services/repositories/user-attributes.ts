import {IAttribute, IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {baseBulk} from '@/services/base/entity.bulk';
import {baseCreate, baseDelete, baseList, baseRead, baseUpdate} from '@/services/base/entity.crud';

const entity = 'userAttributes';
const slug = 'user-attributes';

export const userAttributes: IRepository<IAttribute> = {
  freeTextSearch: true,
  entity: entity,
  slug: slug,
  title: {
    singular: `$vuetify.${entity}.singular`,
    plural: `$vuetify.${entity}.plural`,
  },
  defaultSortOrder: '-createdAt',
  listPage: `/${slug}`,
  addPage: `/${slug}/add`,
  viewPagePrefix: `/${slug}/view`,
  editPagePrefix: `/${slug}/edit`,
  fields: {
    id: {
      label: `$vuetify.${entity}.fields.id`,
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    type: { // todo: create enum type fields that are limited to a specific selection of values
      label: `$vuetify.${entity}.fields.type`,
      type: EnumFieldType.Text,
    },
    key: {
      label: `$vuetify.${entity}.fields.key`,
      type: EnumFieldType.Text,
      pattern: /^[a-zA-z0-9]+$/,
      patternMessage: '$vuetify.validations.jsonKey',
    },
    name: {
      label: `$vuetify.${entity}.fields.name`,
      type: EnumFieldType.Text,
    },
    description: {
      label: `$vuetify.${entity}.fields.description`,
      type: EnumFieldType.TextArea,
      optional: true,
    },
    modifiedAt: {
      label: `$vuetify.${entity}.fields.modifiedAt`,
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: `$vuetify.${entity}.fields.createdAt`,
      type: EnumFieldType.DateTime,
      readonly: true,
      filterable: true,
    },
  },
  headers: [
    {
      fieldKey: 'key',
    },
    {
      fieldKey: 'name',
    },
    {
      fieldKey: 'description',
    },
    {
      fieldKey: 'createdAt',
      align: EnumHeaderAlign.End,
    },
  ],
  sections: [
    new Section(`$vuetify.${entity}.sections.general`, [
      'id',
      'type',
      'key',
      'name',
      'description',
      'modifiedAt',
      'createdAt',
    ]),
  ],
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      title: '$vuetify.entityList.delete',
      key: 'delete'
    }
  ],

  list: baseList<IAttribute>(slug),
  create: baseCreate<IAttribute>(slug),
  read: baseRead<IAttribute>(slug),
  update: baseUpdate<IAttribute>(slug),
  delete: baseDelete<IAttribute>(slug),
  bulk: baseBulk(slug),
};
