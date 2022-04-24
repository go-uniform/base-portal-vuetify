import af from 'vuetify/src/locale/af';
const phrases: any = af;

phrases.base = {
  validations: {
    saveFailed: 'Sommige velde kon nie bekragtig word nie, so die verandering is nie gestoor nie.',
    required: 'Mag nie leeg wees nie',
    email: 'Moet \'n geldige e-posadres wees',
    length: 'Mag nie meer as {0} karakters lank wees nie.',
  },
  errors: {
    unknownOtpType: 'Onbekende OTP tipe \'{0}\' bespeur',
    incorrectOtpPin: 'Verkeerde OTP pin verskaf',
  },
  app: {
    scrollTop: 'Rol Boontoe',
    title: 'Uniform',
    headerTitle: 'Uniform',
    logoAlt: 'Uniform',
    logoUrl: 'https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png',
    smallLogoAlt: 'Uniform',
    smallLogoUrl: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png',
    theme: 'Wyse',
    lightMode: 'Ligte Wyse',
    darkMode: 'Donker Wyse',
    logout: 'Teken Uit',
    mainMenu: 'Hooflys',
    backLogin: 'Terug na aanmelding',
    backSafety: 'Terug na veiligheid',
    save: 'Skep',
    cancel: 'Kanselleer',
    agreeTitle: 'Ja',
    disagreeTitle: 'Nee',
    deleteConfirmationTitle: 'Is jy seker?',
    deleteConfirmationMessage: 'Is jy seker jy wil die geselekteerde rekord uitvee?',
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
    pageHtml: '<p class="display-2">Jy is vanlyn.</p><p>Probeer:</p><ul><li>Skakel vliegtuigmodus af</li><li>Skakel mobiele data of Wi aan -Fi</li><li>Kontroleer tans die sein in jou area</li></ul><br><p>Hierdie boodskap sal outomaties toemaak sodra jou verbinding herstel is.</p>'
  }
};

export default phrases;
