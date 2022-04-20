import en from '@/locale/base/en';
const phrases: any = en;

phrases.custom = {
  empty: 'empty',
  menu: {
    users: 'Users',
  },
  users: {
    singular: 'User',
    plural: 'Users',
    sections: {
      general: 'General',
      attributes: 'Attributes',
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
      name: 'Name',
      description: 'Description',
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
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
};

export default phrases;
