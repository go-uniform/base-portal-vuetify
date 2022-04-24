import en from '@/locale/base/en';
const phrases: any = en;

phrases.custom = {
  empty: 'empty',
  menu: {
    users: {
      title: 'Users',
      icon: 'mdi-account',
    },
  },
  users: {
    singular: 'User',
    plural: 'Users',
    sections: {
      general: 'General',
      attributes: 'Attributes',
      permissions: 'Permissions',
    },
    fields: {
      id: 'Id',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email',
      userRoleId: 'User Role',
      parentUserId: 'Parent User',
      attributes: {
        title: 'Attributes',
        sex: 'Sex',
      },
      permissions: {
        title: 'Permissions',
        usersListOwner: 'Users List Owner',
      },
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
  },
  userRoles: {
    singular: 'User Role',
    plural: 'User Roles',
    sections: {
      general: 'General',
    },
    fields: {
      id: 'Id',
      status: 'Status',
      name: 'Name',
      description: 'Description',
      super: 'Super',
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
    hints: {
      super: 'A super user role has access to everything but can explicitly be denied permissions.',
    },
    enums: {
      status: {
        pending: {
          title: 'Pending',
          icon: 'mdi-timer-sand-full',
          color: 'grey',
        },
        approved: {
          title: 'Approved',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        rejected: {
          title: 'Rejected',
          icon: 'mdi-close-thick',
          color: 'danger',
        }
      }
    }
  },
  userAttributes: {
    singular: 'User Attribute',
    plural: 'User Attributes',
    sections: {
      general: 'General',
    },
    fields: {
      id: 'Id',
      type: 'Type',
      key: 'Key',
      name: 'Name',
      description: 'Description',
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
  },
  permissions: {
    singular: 'Permission',
    plural: 'Permissions',
    enums: {
      type: {
        inherit: {
          title: 'Inherit',
          icon: 'mdi-arrow-up-left',
          color: 'grey',
        },
        allow: {
          title: 'Allow',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        deny: {
          title: 'Deny',
          icon: 'mdi-close-thick',
          color: 'danger',
        },
      }
    }
  }
};

export default phrases;
