import {userRoles} from '@/services/repositories/user-roles';
import {IRepository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {userAttributes} from '@/services/repositories/user-attributes';
import {permissions} from '@/services/repositories/permissions';
import {Attributes} from "@/services/base/global.types";
import {baseCreate, baseDelete, baseList, baseRead, baseUpdate} from '@/services/base/entity.crud';
import {baseBulk} from '@/services/base/entity.bulk';

const entity = 'users';
const slug = entity;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userRoleId: string;
  userRoleLabel: string;
  parentUserId?: string;
  parentUserLabel?: string;
  attributes: Attributes;
  permissions: Attributes;
  allowPermissionByDefault?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

export const users: IRepository<IUser> = {
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
  default: {},
  fields: {
    id: {
      label: `$vuetify.${slug}.fields.id`,
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    firstName: {
      label: `$vuetify.${slug}.fields.firstName`,
      type: EnumFieldType.Text,
    },
    lastName: {
      label: `$vuetify.${slug}.fields.lastName`,
      type: EnumFieldType.Text,
    },
    username: {
      label: `$vuetify.${slug}.fields.username`,
      type: EnumFieldType.Text,
    },
    email: {
      label: `$vuetify.${slug}.fields.email`,
      type: EnumFieldType.Text,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: '$vuetify.validations.email',
      optional: true,
    },
    userRoleId: {
      label: `$vuetify.${slug}.fields.userRoleId`,
      type: EnumFieldType.LinkId,
      linkLabelFieldKey: 'userRoleLabel',
      linkRepository: userRoles,
    },
    userRoleLabel: {
      label: `$vuetify.${slug}.fields.userRoleId`,
      type: EnumFieldType.LinkLabel,
      linkIdFieldKey: 'userRoleId',
      readonly: true,
    },
    parentUserId: {
      label: `$vuetify.${slug}.fields.parentUserId`,
      type: EnumFieldType.SelfReferenceId,
      selfReferenceLabelFieldKey: 'parentUserLabel',
      textAssemblyCallback: (item) => { return `${item.firstName} ${item.lastName}`; },
      optional: true,
    },
    parentUserLabel: {
      label: `$vuetify.${slug}.fields.parentUserLabel`,
      type: EnumFieldType.SelfReferenceLabel,
      selfReferenceIdFieldKey: 'parentUserId',
      readonly: true,
      optional: true,
    },
    attributes: {
      label: `$vuetify.${slug}.fields.attributes`,
      type: EnumFieldType.Attributes,
      attributeRepository: userAttributes,
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
      filterable: true,
      readonly: true,
    },
  },
  headers: [
    {
      title: `$vuetify.${slug}.virtual.name`,
      displayCallback: (item) => { return `${item.firstName} ${item.lastName}` },
      sortable: false,
    },
    {
      fieldKey: 'username',
    },
    {
      fieldKey: 'email',
    },
    {
      fieldKey: 'userRoleId',
    },
    {
      fieldKey: 'parentUserId',
    },
    {
      fieldKey: 'createdAt',
      align: EnumHeaderAlign.End,
    },
  ],
  sections: [
    new Section(`$vuetify.${slug}.sections.general`, [
      'id',
      'firstName',
      'lastName',
      'username',
      'email',
      'userRoleId',
      'parentUserId',
      'modifiedAt',
      'createdAt',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
    new Section(`$vuetify.${slug}.sections.attributes`, [
      'attributes',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
    new Section(`$vuetify.${slug}.sections.permissions`, [
      'permissions',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
  ],
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      title: '$vuetify.entityList.delete',
      key: 'delete'
    }
  ],

  list: baseList<IUser>(slug),
  create: baseCreate<IUser>(slug),
  read: baseRead<IUser>(slug),
  update: baseUpdate<IUser>(slug),
  delete: baseDelete<IUser>(slug),
  bulk: baseBulk(slug),
};
