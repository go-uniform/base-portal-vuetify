import {IRepository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
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
  viewPage: `/${slug}/view/{0}`,
  editPage: `/${slug}/edit/{0}`,
  fields: {
    id: {
      label: `$vuetify.${entity}.fields.id`,
      type: EnumValueType.Uuid,
      readonly: true,
    },
    status: {
      label: `$vuetify.${entity}.fields.status`,
      type: EnumValueType.Enumeration,
      defaultValue: 'pending',
      values: [
        {
          value: 'pending',
          title: `$vuetify.${entity}.enums.status.pending.title`,
          icon: `$vuetify.${entity}.enums.status.pending.icon`,
          color: `$vuetify.${entity}.enums.status.pending.color`,
        },
        {
          value: 'approved',
          title: `$vuetify.${entity}.enums.status.approved.title`,
          icon: `$vuetify.${entity}.enums.status.approved.icon`,
          color: `$vuetify.${entity}.enums.status.approved.color`,
        },
        {
          value: 'rejected',
          title: `$vuetify.${entity}.enums.status.rejected.title`,
          icon: `$vuetify.${entity}.enums.status.rejected.icon`,
          color: `$vuetify.${entity}.enums.status.rejected.color`,
        }
      ],
      textOnly: true,
      filterable: true,
    },
    name: {
      label: `$vuetify.${entity}.fields.name`,
      type: EnumValueType.Text,
    },
    description: {
      label: `$vuetify.${entity}.fields.description`,
      type: EnumValueType.TextArea,
      optional: true,
    },
    super: {
      label: `$vuetify.${entity}.fields.super`,
      type: EnumValueType.Boolean,
      optional: true,
      hint: `$vuetify.${entity}.hints.super`,
      iconOnly: true,
      filterable: true,
    },
    permissions: {
      label: `$vuetify.${entity}.fields.permissions`,
      type: EnumValueType.Attributes,
      attributeRepository: permissions,
    },
    modifiedAt: {
      label: `$vuetify.${entity}.fields.modifiedAt`,
      type: EnumValueType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: `$vuetify.${entity}.fields.createdAt`,
      type: EnumValueType.DateTime,
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
    new Section(`$vuetify.${entity}.sections.general`, [
      'id',
      'status',
      'name',
      'description',
      'super',
      'modifiedAt',
      'createdAt',
    ]),
    new Section(`$vuetify.${entity}.sections.permissions`, [
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
