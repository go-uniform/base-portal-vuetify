import en from 'vuetify/src/locale/en';
const phrases: any = en;

phrases.raw = {
  Email: 'Email',
  Password: 'Password',
  Login: 'Login',
  Logoff: 'Logoff',
  Home: 'Home',
  About: 'About',
  Validate: 'Validate',
  Edit: 'Edit',
  View: 'View',
  Delete: 'Delete',
};

phrases.custom = {
  errors: {
    unknownOtpType: 'Unknown otp type \'{0}\' detected',
    incorrectOtpPin: 'Incorrect pin supplied',
  },
  cookie: {
    consentTitle: 'Your privacy',
    consentBody: 'By clicking "Accept all cookies", you agree we may store cookies on your device and disclose information in accordance with our <a href="/policies/cookie">Cookie Policy.<a/>',
    consentBtn: 'Accept all cookies',
  },
};

export default phrases;
