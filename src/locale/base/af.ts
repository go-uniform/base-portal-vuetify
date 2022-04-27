import af from 'vuetify/src/locale/af';
import {extend} from '@/locale/base/base';

export default extend(af, {
  validations: {
    saveFailed: 'Sommige velde kon nie bekragtig word nie, so die verandering is nie gestoor nie.',
    required: 'Mag nie leeg wees nie',
    email: 'Moet \'n geldige e-posadres wees',
    length: 'Mag nie meer as {0} karakters lank wees nie.',
  },
  errors: {
    missingFilterType: '\'n Filterkontrole vir \'{0}\' is nog nie geïmplementeer nie',
    general: 'Iets het verkeerd geloop',
    recordNotFound: 'Die rekord kon nie gevind word nie',
    accountDoesNotExist: 'Geen rekening kon gevind word vir die gegewe gebruikersnaam/e-pos nie',
    invalidCredentials: 'Ongeldige gebruikersnaam/e-pos of wagwoord gegee',
    unknownOtpType: 'Onbekende OTP tipe \'{0}\' bespeur',
    incorrectOtpPin: 'Verkeerde OTP pin verskaf',
  },
  app: {
    title: process.env.VUE_APP_TITLE,

    headerTitle: '',
    headerLogoFullAlt: process.env.VUE_APP_TITLE,
    headerLogoFullDark: 'full.png',
    headerLogoFullLight: 'full.png',
    headerLogoCompactAlt: process.env.VUE_APP_TITLE[0],
    headerLogoCompactDark: 'compact.png',
    headerLogoCompactLight: 'compact.png',

    standaloneLogoFullAlt: process.env.VUE_APP_TITLE,
    standaloneLogoFullDark: 'full.png',
    standaloneLogoFullLight: 'full.png',
    standaloneLogoCompactAlt: process.env.VUE_APP_TITLE[0],
    standaloneLogoCompactDark: 'compact.png',
    standaloneLogoCompactLight: 'compact.png',

    loading: 'Laai...',
    loadingTimeout: 'Werking was outomaties gekanselleer aangesien die stelsel te lank geneem het om te reageer',
    loggingOut: 'Teken uit...',
    deleting: 'Vee data uit...',
    submitting: 'Dien data in...',
    submittedSuccessfully: 'Data suksesvol ingedien',
    scrollTop: 'Rol Boontoe',
    theme: 'Wyse',
    lightMode: 'Ligte Wyse',
    darkMode: 'Donker Wyse',
    logout: 'Teken Uit',
    mainMenu: 'Hooflys',
    backLogin: 'Terug na aanmelding',
    backSafety: 'Terug na veiligheid',
    save: 'Stoor',
    cancel: 'Kanselleer',
    agreeTitle: 'Ja',
    disagreeTitle: 'Nee',
    deleteConfirmationTitle: 'Is jy seker?',
    deleteConfirmationMessage: 'Is jy seker jy wil die geselekteerde rekord uitvee?',
    optionNotSetColor: 'accent',
    optionNotSetIcon: 'mdi-cancel',
    optionNotSetTitle: 'Nie Gestel Nie',
    boolean: {
      trueColor: 'success',
      trueIcon: 'mdi-check-bold',
      trueTitle: 'Ja',
      falseColor: 'danger',
      falseIcon: 'mdi-close-thick',
      falseTitle: 'Nee',
    }
  },
  logout: {
    pageTitle: 'Teken Uit',
    pageHtml: 'Jy is suksesvol van die stelsel afgemeld.',
  },
  login: {
    pageTitle: 'Teken In',
    title: 'Teken in op jou rekening',
    identifier: 'Gebruikersnaam of E-pos',
    password: 'Wagwoord',
    button: 'Teken In',
    forgot: 'Wagwoord vergeet?'
  },
  otp: {
    pageTitle: 'OTP',
    title: 'Voer jou eenmalige pin (OTP) in',
    validate: 'Valideer',
    resend: 'Stuur Weer',
    resent: '\'n Nuwe eenmalige pin (OTP) is aan jou gestuur',
    resendConfirmationTitle: 'Is jy seker?',
    resendConfirmationMessage: 'Herstuur sal \'n nuwe kode genereer en die voorheen gestuurde kode ongeldig maak, gebruik dit slegs as jy nie die kode betyds ontvang het nie. Is jy steeds seker jy wil weer vir jouself \'n nuwe kode stuur?',
  },
  passwordReset: {
    pageTitle: 'Herstel Wagwoord',
    title: 'Herstel jou rekening wagwoord',
    identifier: 'Gebruikersnaam of E-pos',
    button: 'HerStel',
  },
  home: {
    pageTitle: 'Tuis',
    icon: 'mdi-home',
  },
  entity: {
    list: 'Lys {0}',
    new: 'Nuwe {0}',
    edit: 'Wysig {0}',
    view: 'Beskou {0}',
  },
  entityList: {
    title: 'Lys',
    actions: 'Aksies',
    new: 'Nuwe',
    edit: 'Wysig',
    view: 'Beskou',
    delete: 'Skrap',
    bulk: 'Maat',
    bulkActionConfirmationTitle: 'Is jy seker?',
    bulkActionConfirmationMessage: 'Jy is op die punt om {0} oor {1} rekord(s) uit te voer, is jy seker jy wil dit nog doen?',
  },
  entityView: {
    list: 'Lys',
    view: 'Beskou',
    edit: 'Wysig',
    delete: 'Skrap',
  },
  entityEdit: {
    new: 'Nuwe',
    view: 'Beskou',
    edit: 'Wysig',
  },
  entityFilters: {
    title: 'Soek',
    freeTextSearch: 'Soek Terme',
    search: 'Soek',
    reset: 'Herstel',
  },
  notFound: {
    pageTitle: 'Bladsy Nie Gevind Nie',
    pageHtml: 'Die bladsy waarna jy soek kan nie gevind word nie.',
  },
  cookieConsent: {
    pageTitle: 'Koekie Toestemming',
    pageHtml: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet sem dapibus, placerat orci a, euismod lacus. Mauris eget eros id ex convallis dictum sit amet vel felis. Donec lectus quam, mattis quis velit faucibus, congue finibus metus. In neque mi, tristique nec mattis ac, tristique vel dolor. Donec posuere justo orci, congue vehicula nibh luctus sit amet. Integer mi mi, dapibus ultrices tortor et, sollicitudin posuere sapien. Nulla facilisi. Proin congue arcu vel mattis molestie. Phasellus felis quam, tincidunt non eros eu, tempus sodales ligula. In euismod consectetur porta.</p>',
    popUpTitle: 'Jou privaatheid',
    popUpBody: 'Deur "Aanvaar alle koekies" te klik, stem jy in dat ons koekies op jou toestel kan stoor en inligting kan openbaar in ooreenstemming met ons <a href="/policies/cookie">koekiebeleid.<a/>',
    popUpBtn: 'Aanvaar alle koekies',
  },
  connection: {
    pageHtml: '<p class="display-2">Jy is vanlyn af.</p><p>Probeer:</p><ul><li>Skakel vliegtuigmodus af</li><li>Skakel mobiele data of Wi aan -Fi</li><li>Kontroleer tans die sein in jou area</li></ul><br><p>Hierdie boodskap sal outomaties toemaak sodra jou verbinding herstel is.</p>'
  },
  empty: 'leeg',
  menu: {
    reports: {
      title: 'Rapporte',
      icon: 'mdi-chart-box',
      example1: {
        title: 'Voorbeeld 1',
      }
    },
    users: {
      title: 'Gebruikers',
      icon: 'mdi-account',
    },
  },
  reports: {
    example1: {
      title: 'Voorbeeld 1',
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
    virtual: {
      name: 'Naam',
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
        age: 'Ouderdom',
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
      super: '\'n Super gebruiker rol het toegang tot alles, maar kan uitdruklik toestemmings geweier word.',
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
    sections: {
      general: 'Algemeen',
    },
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
  },
});
