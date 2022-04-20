import af from '@/locale/base/af';
const phrases: any = af;

phrases.custom = {
  menu: {
    users: 'Gebruikers',
  },
  users: {
    singular: 'Gebruiker',
    plural: 'Gebruikers',
    sections: {
      general: 'Algemeen',
      attributes: 'Eienskappe',
    },
    fields: {
      id: 'Id',
      firstName: 'Eerste Naam',
      lastName: 'Tweede Name',
      username: 'Gebruikersnaam',
      email: 'E-pos',
      userRoleId: 'Gebruikersrol',
      attributes: {
        title: 'Eienskappe',
        sex: 'Geslag',
      },
      modifiedAt: 'Gewysig Teen',
      createdAt: 'Geskep Teen',
    },
  },
  userRoles: {
    singular: 'Gebruiker Rol',
    plural: 'Gebruikers Rolle',
    sections: {
      general: 'Algemeen',
    },
    fields: {
      id: 'Id',
      name: 'Naam',
      description: 'Beskrywing',
      modifiedAt: 'Gewysig Teen',
      createdAt: 'Geskep Teen',
    },
  },
  userAttributes: {
    singular: 'Gebruiker Attribute',
    plural: 'Gebruiker Attributes',
    sections: {
      general: 'Algemeen',
    },
    fields: {
      id: 'Id',
      type: 'Tiepe',
      key: 'Sleutel',
      name: 'Naam',
      description: 'Beskrywing',
      modifiedAt: 'Gewysig Teen',
      createdAt: 'Geskep Teen',
    },
  },
};

export default phrases;
