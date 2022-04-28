import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {permissions} from '@/services/repositories/permissions';
import {baseCreate, baseDelete, baseList, baseRead, baseUpdate} from '@/services/base/entity.crud';
import {baseBulk} from '@/services/base/entity.bulk';

const entity = 'userRoles';
const slug = 'user-roles';

export interface IUserRole {
  id: string;
  status: string;
  name: string;
  description: string;
  super?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

export const userRoles: IRepository<IUserRole> = {
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
    status: {
      label: `$vuetify.${slug}.fields.status`,
      type: EnumFieldType.Enumeration,
      defaultValue: 'pending',
      values: [
        {
          value: 'pending',
          title: `$vuetify.${slug}.enums.status.pending.title`,
          icon: `$vuetify.${slug}.enums.status.pending.icon`,
          color: `$vuetify.${slug}.enums.status.pending.color`,
        },
        {
          value: 'approved',
          title: `$vuetify.${slug}.enums.status.approved.title`,
          icon: `$vuetify.${slug}.enums.status.approved.icon`,
          color: `$vuetify.${slug}.enums.status.approved.color`,
        },
        {
          value: 'rejected',
          title: `$vuetify.${slug}.enums.status.rejected.title`,
          icon: `$vuetify.${slug}.enums.status.rejected.icon`,
          color: `$vuetify.${slug}.enums.status.rejected.color`,
        }
      ],
      textOnly: true,
      filterable: true,
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
    super: {
      label: `$vuetify.${slug}.fields.super`,
      type: EnumFieldType.Boolean,
      optional: true,
      hint: `$vuetify.${slug}.hints.super`,
      iconOnly: true,
      filterable: true,
    },
    permissions: {
      label: `$vuetify.${slug}.fields.permissions`,
      type: EnumFieldType.Attributes,
      attributeRepository: permissions,
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
      fieldKey: 'status',
    },
    {
      fieldKey: 'name',
    },
    {
      fieldKey: 'description',
    },
    {
      fieldKey: 'super',
    },
    {
      fieldKey: 'createdAt',
      align: EnumHeaderAlign.End,
    },
  ],
  sections: [
    new Section(`$vuetify.${slug}.sections.general`, [
      'id',
      'status',
      'name',
      'description',
      'super',
      'modifiedAt',
      'createdAt',
    ]),
    new Section(`$vuetify.${slug}.sections.permissions`, [
      'permissions',
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

  list: baseList<IUserRole>(slug),
  create: baseCreate<IUserRole>(slug),
  read: baseRead<IUserRole>(slug),
  update: baseUpdate<IUserRole>(slug),
  delete: baseDelete<IUserRole>(slug),
  bulk: baseBulk(slug),
};
