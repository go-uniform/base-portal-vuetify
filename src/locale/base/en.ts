import en from 'vuetify/src/locale/en';
const phrases: any = en;

phrases.base = {
  validations: {
    saveFailed: 'Some fields failed validation so the change were not saved.',
    required: 'May not be empty',
    email: 'Must be a valid email address',
    length: 'May not be more than {0} characters long.',
  },
  errors: {
    general: 'Something went wrong',
    recordNotFound: 'The record could not be found',
    unknownOtpType: 'Unknown OTP type \'{0}\' detected',
    incorrectOtpPin: 'Incorrect OTP supplied',
  },
  app: {
    loading: 'Loading...',
    submitting: 'Submitting data...',
    submittedSuccessfully: 'Data successfully submitted',
    scrollTop: 'Scroll Top',
    title: 'Uniform',
    headerTitle: 'Uniform',
    logoAlt: 'Uniform',
    logoUrl: 'https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png',
    smallLogoAlt: 'Uniform',
    smallLogoUrl: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    logout: 'Log Out',
    mainMenu: 'Main Menu',
    backLogin: 'Back to login',
    backSafety: 'Back to safety',
    save: 'Save',
    cancel: 'Cancel',
    agreeTitle: 'Yes',
    disagreeTitle: 'No',
    deleteConfirmationTitle: 'Are you sure?',
    deleteConfirmationMessage: 'Are you sure you wish to delete the selected record?',
    boolean: {
      trueColor: 'success',
      trueIcon: 'mdi-check-bold',
      trueTitle: 'Yes',
      falseColor: 'danger',
      falseIcon: 'mdi-close-thick',
      falseTitle: 'No',
    }
  },
  logout: {
    pageTitle: 'Logout',
    pageHtml: 'You have been successfully logged out of the system.',
  },
  login: {
    pageTitle: 'Login',
    title: 'Log into your account',
    identifier: 'Username or Email',
    password: 'Password',
    button: 'Login',
    forgot: 'Forgot Password?'
  },
  otp: {
    pageTitle: 'OTP',
    title: 'Enter your one time pin (OTP)',
    validate: 'Validate',
    resend: 'Resend',
    resendConfirmationTitle: 'Are you sure?',
    resendConfirmationMessage: 'Resending will generate a new code and invalidate the previously sent code, only use this if you have not received the code in a timely fashion. Are you still sure you wish to resend yourself a new code?',
  },
  passwordReset: {
    pageTitle: 'Reset Password',
    title: 'Reset your account password',
    identifier: 'Username or Email',
    button: 'Reset',
  },
  home: {
    pageTitle: 'Home',
    icon: 'mdi-home',
  },
  entity: {
    list: 'List {0}',
    new: 'New {0}',
    edit: 'Edit {0}',
    view: 'View {0}',
  },
  entityList: {
    title: 'List',
    actions: 'Actions',
    new: 'New',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    bulk: 'Bulk',
    bulkActionConfirmationTitle: 'Are you sure?',
    bulkActionConfirmationMessage: 'You are about to {0} {1} record(s), are you sure you want to do this?',
  },
  entityView: {
    list: 'List',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
  },
  entityEdit: {
    new: 'New',
    view: 'View',
    edit: 'Edit',
  },
  entityFilters: {
    title: 'Search',
    freeTextSearch: 'Search Terms',
    search: 'Search',
    reset: 'Reset',
  },
  notFound: {
    pageTitle: 'Page Not Found',
    pageHtml: 'The page you are looking for can\'t be found.',
  },
  cookieConsent: {
    pageTitle: 'Cookie Consent',
    pageHtml: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet sem dapibus, placerat orci a, euismod lacus. Mauris eget eros id ex convallis dictum sit amet vel felis. Donec lectus quam, mattis quis velit faucibus, congue finibus metus. In neque mi, tristique nec mattis ac, tristique vel dolor. Donec posuere justo orci, congue vehicula nibh luctus sit amet. Integer mi mi, dapibus ultrices tortor et, sollicitudin posuere sapien. Nulla facilisi. Proin congue arcu vel mattis molestie. Phasellus felis quam, tincidunt non eros eu, tempus sodales ligula. In euismod consectetur porta.</p>',
    popUpTitle: 'Your privacy',
    popUpBody: 'By clicking "Accept all cookies", you agree we may store cookies on your device and disclose information in accordance with our <a href="/policies/cookie">Cookie Policy.<a/>',
    popUpBtn: 'Accept all cookies',
  },
  connection: {
    pageHtml: '<p class="display-2">You are offline.</p><p>Try:</p><ul><li>Turning off airplane mode</li><li>Turning on mobile data or Wi-Fi</li><li>Checking the signal in your area</li></ul><br><p>This message will automatically close once your connection is restored.</p>'
  }
};

export default phrases;
