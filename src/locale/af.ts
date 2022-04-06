import af from 'vuetify/src/locale/af';
const phrases: any = af;

phrases.raw = {
  Email: 'Epos',
  Password: 'Wagwoord',
  Login: 'Teken In',
  Logoff: 'Teken Uit',
  Home: 'Tuis',
  About: 'Oor',
  Validate: 'Valideer',
};

phrases.custom = {
  errors: {
    unknownOtpType: 'Unknown otp type \'{0}\' detected',
    incorrectOtpPin: 'Incorrect pin supplied',
  },
  about: {
    content: '<h1>Meer oor ons</h1><p>Ons is \'n jong en opkomende maatskappy wat jou in soveel aspekte sal blaas.</p>',
  },
};

export default phrases;
