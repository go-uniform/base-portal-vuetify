import {Repository} from '@/services/base/global.interfaces';
import {EnumValueType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';
import {permissions} from '@/services/repositories/permissions';

const entity = 'userRoles';
const slug = 'user-roles';

export interface UserRole {
  id: string;
  status: string;
  name: string;
  description: string;
  super?: boolean;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<UserRole>(slug, {}, {});

repository.addField('id', {
  label: '',
  type: EnumValueType.Uuid,
  readonly: true,
});
repository.addField('status', {
  label: '',
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
});
repository.addField('name', {
  label: '',
  type: EnumValueType.Text,
});
repository.addField('description', {
  label: '',
  type: EnumValueType.TextArea,
  optional: true,
});
repository.addField('super', {
  label: '',
  type: EnumValueType.Boolean,
  optional: true,
  hint: `$vuetify.${entity}.hints.super`,
  iconOnly: true,
  filterable: true,
});
repository.addField('permissions', {
  label: '',
  type: EnumValueType.Attributes,
  attributeRepository: permissions,
});

repository.setHeaders([
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
]);

repository.addSection(
    new Section(`$vuetify.${entity}.sections.general`, [
      'id',
      'status',
      'name',
      'description',
      'super',
      'modifiedAt',
      'createdAt',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    })
);

repository.addSection(
    new Section(`$vuetify.${entity}.sections.permissions`, [
      'permissions',
    ], {
      childXl: 3,
      childLg: 4,
      childMd: 6,
    })
);

repository.bulkActions = [
  {
    color: 'error',
    icon: 'mdi-delete',
    title: '$vuetify.entityList.delete',
    key: 'delete'
  }
];

export const userRoles = repository;
