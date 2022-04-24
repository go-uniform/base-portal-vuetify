import af from '@/locale/base/af';
const phrases: any = af;

phrases.custom = {
  empty: 'leeg',
  menu: {
    users: {
      title: 'Gebruikers',
      icon: 'mdi-account',
    },
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
      status: 'Status',
      name: 'Naam',
      description: 'Beskrywing',
      super: 'Super',
      modifiedAt: 'Gewysig Teen',
      createdAt: 'Geskep Teen',
    },
    hints: {
      super: '\'n super gebruiker rol het toegang tot alles, maar kan uitdruklik toestemmings geweier word.',
    },
    enums: {
      status: {
        pending: {
          title: 'Hangende',
          icon: 'mdi-timer-sand-full',
          color: 'grey',
        },
        approved: {
          title: 'Goedgekeur',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        rejected: {
          title: 'Verwerp',
          icon: 'mdi-close-thick',
          color: 'danger',
        }
      }
    }
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
    enums: {
      type: {
        inherit: {
          title: 'Erf',
          icon: 'mdi-arrow-up-left',
          color: 'grey',
        },
        allow: {
          title: 'Toegang',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        deny: {
          title: 'Weier',
          icon: 'mdi-close-thick',
          color: 'danger',
        },
      }
    }
  }
};

export default phrases;
