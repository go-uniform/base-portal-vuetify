import nl from 'vuetify/src/locale/nl';
import {extend} from '@/locale/base/base';

export default extend(nl, {
  validations: {
    saveFailed: 'Sommige velden konden niet worden gevalideerd, dus de wijziging is niet opgeslagen.',
    required: 'Mag niet leeg zijn',
    email: 'Moet een geldig e-mail adres zijn',
    length: 'Mag niet langer zijn dan {0} tekens.',
  },
  errors: {
    unknownBulkAction: 'Onbekend verzoek voor bulkbewerking \'{0}\' ontvangen op entiteit \'{1}\'',
    missingFilterType: 'Filterbesturing voor \'{0}\' is nog niet geïmplementeerd',
    general: 'Er is iets fout gegaan',
    recordNotFound: 'Het record kan niet worden gevonden',
    accountDoesNotExist: 'Er is geen account gevonden voor de opgegeven gebruikersnaam / e-mail',
    invalidCredentials: 'Ongeldige gebruikersnaam / e-mail of wachtwoord opgegeven',
    unknownOtpType: 'Onbekend OTP-type \'{0}\' gedetecteerd',
    incorrectOtpPin: 'Onjuiste OTP-pin verstrekt',
  },
  app: {
    title: process.env.VUE_APP_TITLE,
    footerContent: `<div><strong>${process.env.VUE_APP_TITLE}</strong></div><div><small>${process.env.VUE_APP_VERSION}</small></div>`,

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

    noData: 'Geen gegevens beschikbaar',
    homeComingSoon: 'dashboard-widgets / -statistieken komen hier\n',
    reportComingSoon: 'rapportweergave komt hier',
    myAccount: 'Mijn Rekening',
    settings: 'Instellingen',
    loading: 'Laden...',
    loadingTimeout: 'De bewerking werd automatisch geannuleerd omdat het systeem er te lang over deed om te reageren',
    loggingOut: 'Afmelden...',
    deleting: 'Verwijder data...',
    submitting: 'Gegevens indienen...',
    submittedSuccessfully: 'Gegevens succesvol ingediend',
    scrollTop: 'Oprollen',
    theme: 'Thema',
    lightMode: 'Lichte Modus',
    darkMode: 'Donkere Modus',
    logout: 'Afmelden',
    mainMenu: 'Hoofdlijst',
    backLogin: 'Terug naar aanmelding',
    backSafety: 'Terug naar veiligheid',
    save: 'Opslaan',
    cancel: 'Annuleren',
    agreeTitle: 'Ja',
    disagreeTitle: 'Nee',
    deleteConfirmationTitle: 'Weet je het zeker?',
    deleteConfirmationMessage: 'Weet u zeker dat u het geselecteerde record wilt verwijderen?',
    optionNotSetColor: 'accent',
    optionNotSetIcon: 'mdi-cancel',
    optionNotSetTitle: 'Niet Geleverd',
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
    pageTitle: 'Afmelden',
    pageHtml: 'U bent succesvol uitgelogd uit het systeem.',
  },
  login: {
    pageTitle: 'Inloggen',
    title: 'Log in op jouw account',
    identifier: 'Gebruikersnaam of email',
    password: 'Wachtwoord',
    button: 'Inloggen',
    forgot: 'Wachtwoord vergeten?'
  },
  otp: {
    pageTitle: 'OTP',
    title: 'Voer uw eenmalige pincode (OTP) in',
    validate: 'Valideren',
    resend: 'Opnieuw Versturen',
    resent: 'Er is een nieuwe eenmalige pincode (OTP) naar u verzonden',
    resendConfirmationTitle: 'Weet je het zeker?',
    resendConfirmationMessage: 'Opnieuw verzenden genereert een nieuwe code en maakt de eerder verzonden code ongeldig, gebruik deze alleen als u de code niet op tijd hebt ontvangen. Weet je nog zeker dat je jezelf opnieuw een nieuwe code wilt sturen?',
  },
  passwordReset: {
    pageTitle: 'Wachtwoord Herstel',
    title: 'Reset uw account wachtwoord',
    identifier: 'Gebruikersnaam of email',
    button: 'Herstel',
  },
  home: {
    pageTitle: 'Dashboards',
    icon: 'mdi-home',
  },
  entity: {
    list: 'Lijst {0}',
    new: 'Nieuw {0}',
    edit: 'Bewerk {0}',
    view: 'Weergave {0}',
  },
  entityList: {
    title: 'Lijst',
    actions: 'Acties',
    new: 'Nieuw',
    edit: 'Bewerk',
    view: 'Weergave',
    delete: 'Verwijderen',
    bulk: 'Massaal',
    bulkActionConfirmationTitle: 'Weet je het zeker?',
    bulkActionConfirmationMessage: 'U staat op het punt {0} over {1} record(s) te halen, weet u zeker dat u dat nog steeds wilt doen?',
  },
  entityView: {
    list: 'Lijst',
    view: 'Weergave',
    edit: 'Bewerk',
    delete: 'Verwijderen',
  },
  entityEdit: {
    new: 'Nieuw',
    view: 'Weergave',
    edit: 'Bewerk',
  },
  entityFilters: {
    title: 'Zoekopdracht',
    freeTextSearch: 'Zoektermen',
    search: 'Zoekopdracht',
    reset: 'Herstel',
  },
  entityCards: {
    title: 'Lijst',
    actions: 'Acties',
    new: 'Nieuw',
    edit: 'Bewerk',
    view: 'Weergave',
    delete: 'Verwijderen',
    bulk: 'Massaal',
    bulkActionConfirmationTitle: 'Weet je het zeker?',
    bulkActionConfirmationMessage: 'U staat op het punt {0} over {1} record(s) te halen, weet u zeker dat u dat nog steeds wilt doen?',
    load: 'Meer Laden',
  },
  notFound: {
    pageTitle: 'Pagina Niet Gevonden',
    pageHtml: 'De pagina die u zoekt is niet gevonden.',
  },
  cookieConsent: {
    pageTitle: 'Toestemming Voor Cookies',
    pageHtml: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet sem dapibus, placerat orci a, euismod lacus. Mauris eget eros id ex convallis dictum sit amet vel felis. Donec lectus quam, mattis quis velit faucibus, congue finibus metus. In neque mi, tristique nec mattis ac, tristique vel dolor. Donec posuere justo orci, congue vehicula nibh luctus sit amet. Integer mi mi, dapibus ultrices tortor et, sollicitudin posuere sapien. Nulla facilisi. Proin congue arcu vel mattis molestie. Phasellus felis quam, tincidunt non eros eu, tempus sodales ligula. In euismod consectetur porta.</p>',
    popUpTitle: 'Uw privacy',
    popUpBody: 'Door op "Accepteer alle cookies" te klikken, gaat u ermee akkoord dat we cookies op uw apparaat mogen opslaan en informatie vrijgeven in overeenstemming met ons <a href="/policies/cookie"> cookiebeleid. <a/>',
    popUpBtn: 'Accepteer alle cookies',
  },
  connection: {
    pageHtml: '<p class = "display-2"> Je bent offline. </p> <p> Probeer: </p> <ul> <li> Schakel de vliegtuigmodus uit </li> <li> Schakel mobiele data of wifi in -Fi </li> <li> Momenteel wordt het signaal in uw omgeving gecontroleerd </li> </ul> <br> <p> Dit bericht wordt automatisch gesloten zodra uw verbinding is hersteld. </p>'
  },
  empty: 'blank',
  menu: {
    reports: {
      title: 'Rapporten',
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
  users: {
    singular: 'Gebruiker',
    plural: 'Gebruikers',
    sections: {
      general: 'Algemeen',
      attributes: 'Eigenschappen',
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
      email: 'Email',
      userRole: 'Gebruikersrol',
      parentUser: 'Oudere Gebruiker',
      attributes: {
        title: 'Eigenschappen',
        sex: 'Geslacht',
        age: 'Leeftijd',
      },
      permissions: {
        title: 'Toestemmings',
        usersListOwner: 'Gebruikerslijst Eigenaar',
      },
      modifiedAt: 'Gewijzigd Om',
      createdAt: 'Geskep Om',
    },
  },
  userRoles: {
    singular: 'Gebruiker Rol',
    plural: 'Gebruikers Rolle',
    sections: {
      general: 'Algemeen',
      permissions: 'Toestemmings',
    },
    fields: {
      id: 'Id',
      status: 'Toestand',
      name: 'Naam',
      description: 'Beschrijving',
      super: 'Super',
      permissions: {
        title: 'Toestemmings',
        usersListOwner: 'Gebruikers Lijst Eigenaar',
        usersCreateOwner: 'Gebruikers Maken Eigenaar',
      },
      modifiedAt: 'Gewijzigd Om',
      createdAt: 'Geskep Om',
    },
    hints: {
      super: 'Een supergebruikersrol heeft toegang tot alles, maar toestemming kan expliciet worden geweigerd.',
    },
    enums: {
      status: {
        pending: {
          title: 'In Afwachting',
          icon: 'mdi-timer-sand-full',
          color: 'grey',
        },
        approved: {
          title: 'Goedgekeurd',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        rejected: {
          title: 'Afwijzen',
          icon: 'mdi-close-thick',
          color: 'danger',
        }
      }
    }
  },
  userAttributes: {
    singular: 'Gebruikersfunctie',
    plural: 'Gebruikersfuncties',
    sections: {
      general: 'Algemeen',
    },
    fields: {
      id: 'Id',
      type: 'Tiepe',
      key: 'Sleutel',
      name: 'Naam',
      description: 'Beschrijving',
      super: 'Super',
      modifiedAt: 'Gewijzigd Om',
      createdAt: 'Geskep Om',
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
          title: 'Erven',
          icon: 'mdi-arrow-up-left',
          color: 'grey',
        },
        allow: {
          title: 'Toegang',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        deny: {
          title: 'Weigeren',
          icon: 'mdi-close-thick',
          color: 'danger',
        },
      }
    }
  },
  dashboards: {
    pageTitle: 'Dashboards',
    singular: 'Dashboard',
    plural: 'Dashboards',
    sections: {
      general: 'Algemeen',
    },
    fields: {
      title: 'Titel',
      description: 'Beschrijving',
      modifiedAt: 'Gewijzigd Om',
      createdAt: 'Geskep Om',
    },
  },
  reports: {
    pageTitle: 'Verslae',
    singular: 'Verslag',
    plural: 'Verslae',
    sections: {
      general: 'Algemeen',
    },
    fields: {
      title: 'Titel',
      description: 'Beschrijving',
      modifiedAt: 'Gewijzigd Om',
      createdAt: 'Geskep Om',
    },
  },
  account: {
    pageTitle: 'My Rekening',
    icon: 'mdi-account'
  },
  settings: {
    pageTitle: 'Instellings',
    icon: 'mdi-cogs'
  },
  customizations: {
    pageTitle: 'Aanpassings',
    icon: 'mdi-application-cog-outline'
  },
});
