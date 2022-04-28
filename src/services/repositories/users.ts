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
      label: `$vuetify.${entity}.fields.id`,
      type: EnumFieldType.Uuid,
      readonly: true,
    },
    firstName: {
      label: `$vuetify.${entity}.fields.firstName`,
      type: EnumFieldType.Text,
    },
    lastName: {
      label: `$vuetify.${entity}.fields.lastName`,
      type: EnumFieldType.Text,
    },
    username: {
      label: `$vuetify.${entity}.fields.username`,
      type: EnumFieldType.Text,
    },
    email: {
      label: `$vuetify.${entity}.fields.email`,
      type: EnumFieldType.Text,
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      patternMessage: '$vuetify.validations.email',
      optional: true,
    },
    userRoleId: {
      label: `$vuetify.${entity}.fields.userRoleId`,
      type: EnumFieldType.LinkId,
      linkLabelFieldKey: 'userRoleLabel',
      linkRepository: userRoles,
    },
    userRoleLabel: {
      label: `$vuetify.${entity}.fields.userRoleId`,
      type: EnumFieldType.LinkLabel,
      linkIdFieldKey: 'userRoleId',
      readonly: true,
    },
    parentUserId: {
      label: `$vuetify.${entity}.fields.parentUserId`,
      type: EnumFieldType.SelfReferenceId,
      selfReferenceLabelFieldKey: 'parentUserLabel',
      textAssemblyCallback: (item) => { return `${item.firstName} ${item.lastName}`; },
      optional: true,
    },
    parentUserLabel: {
      label: `$vuetify.${entity}.fields.parentUserLabel`,
      type: EnumFieldType.SelfReferenceLabel,
      selfReferenceIdFieldKey: 'parentUserId',
      readonly: true,
      optional: true,
    },
    attributes: {
      label: `$vuetify.${entity}.fields.attributes`,
      type: EnumFieldType.Attributes,
      attributeRepository: userAttributes,
    },
    permissions: {
      label: `$vuetify.${entity}.fields.permissions`,
      type: EnumFieldType.Attributes,
      attributeRepository: permissions,
    },
    modifiedAt: {
      label: `$vuetify.${entity}.fields.modifiedAt`,
      type: EnumFieldType.DateTime,
      readonly: true,
    },
    createdAt: {
      label: `$vuetify.${entity}.fields.createdAt`,
      type: EnumFieldType.DateTime,
      filterable: true,
      readonly: true,
    },
  },
  headers: [
    {
      title: `$vuetify.${entity}.virtual.name`,
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
    new Section(`$vuetify.${entity}.sections.general`, [
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
    new Section(`$vuetify.${entity}.sections.attributes`, [
      'attributes',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    }),
    new Section(`$vuetify.${entity}.sections.permissions`, [
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
