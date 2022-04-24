import af from '@/locale/base/af';
const phrases: any = af;

phrases.custom = {
  empty: 'leeg',
  menu: {
    users: 'Gebruikers',
  },
  users: {
    singular: 'Gebruiker',
    plural: 'Gebruikers',
    sections: {
      general: 'Algemeen',
      attributes: 'Eienskappe',
      permissions: 'Toestemmings',
    },
    fields: {
      id: 'Id',
      firstName: 'Eerste Naam',
      lastName: 'Tweede Name',
      username: 'Gebruikersnaam',
      email: 'E-pos',
      userRoleId: 'Gebruikersrol',
      parentUserId: 'Ouer Gebruiker',
      attributes: {
        title: 'Eienskappe',
        sex: 'Geslag',
      },
      permissions: {
        title: 'Toestemmings',
        usersListOwner: 'Gebruikers Lys Eienaar',
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
    singular: 'Gebruiker Eienskap',
    plural: 'Gebruiker Eienskappe',
    sections: {
      general: 'Algemeen',
    },
    fields: {
      id: 'Id',
      type: 'Tiepe',
      key: 'Sleutel',
      name: 'Naam',
      description: 'Beskrywing',
      super: 'Super',
      modifiedAt: 'Gewysig Teen',
      createdAt: 'Geskep Teen',
    },
  },
  permissions: {
    singular: 'Toestemming',
    plural: 'Toestemmings',
  }
};

export default phrases;
