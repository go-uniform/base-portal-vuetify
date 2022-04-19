import en from '@/locale/base/en';
const phrases: any = en;

phrases.custom = {
  users: {
    singular: 'User',
    plural: 'Users',
    sections: {
      general: 'General',
    },
    fields: {
      id: 'Id',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email',
      userRoleId: 'User Role',
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
      name: 'Email',
      description: 'Description',
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
  },
};

export default phrases;
