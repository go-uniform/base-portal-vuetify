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
};

phrases.custom = {
  errors: {
    unknownOtpType: 'Unknown otp type \'{0}\' detected',
    incorrectOtpPin: 'Incorrect pin supplied',
  },
  about: {
    content: '<h1>About Us</h1><p>We are a young and upcoming company that will blow your mind in so many aspects.</p>',
  },
};

export default phrases;
