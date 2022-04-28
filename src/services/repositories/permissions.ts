import {IAttribute, IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {baseBulk} from '@/services/base/entity.bulk';
import {baseCreate, baseDelete, baseList, baseRead, baseUpdate} from '@/services/base/entity.crud';

const entity = 'permissions';
const slug = entity;

export const permissions: IRepository<IAttribute> = {
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
      label: `$vuetify.${slug}.fields.id`,
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    type: {
      label: `$vuetify.${slug}.fields.type`,
      type: EnumFieldType.Enumeration,
      defaultValue: 'inherit',
      values: [
        {
          value: 'inherit',
          title: `$vuetify.${slug}.enums.type.inherit.title`,
          icon: `$vuetify.${slug}.enums.type.inherit.icon`,
          color: `$vuetify.${slug}.enums.type.inherit.color`,
        },
        {
          value: 'allow',
          title: `$vuetify.${slug}.enums.type.allow.title`,
          icon: `$vuetify.${slug}.enums.type.allow.icon`,
          color: `$vuetify.${slug}.enums.type.allow.color`,
        },
        {
          value: 'deny',
          title: `$vuetify.${slug}.enums.type.deny.title`,
          icon: `$vuetify.${slug}.enums.type.deny.icon`,
          color: `$vuetify.${slug}.enums.type.deny.color`,
        },
      ],
    },
    key: {
      label: `$vuetify.${slug}.fields.key`,
      type: EnumFieldType.Text,
      pattern: /^[a-zA-z0-9]+$/,
      patternMessage: '$vuetify.validations.jsonKey',
    },
    name: {
      label: `$vuetify.${slug}.fields.name`,
      type: EnumFieldType.Text,
    },
    description: {
      label: `$vuetify.${slug}.fields.description`,
      type: EnumFieldType.TextArea,
      optional: true,
    },
    modifiedAt: {
      label: `$vuetify.${slug}.fields.modifiedAt`,
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: `$vuetify.${slug}.fields.createdAt`,
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
    new Section(`$vuetify.${slug}.sections.general`, [
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
