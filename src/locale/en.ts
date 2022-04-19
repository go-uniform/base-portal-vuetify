import en from 'vuetify/src/locale/en';
const phrases: any = en;

phrases.raw = {
  'Username or Email': 'Username or Email',
  Reset: 'Reset ',
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
  'Light Mode': 'Light Mode',
  'Dark Mode': 'Dark Mode',
  Yes: 'Yes',
  No: 'No',
  Save: 'Save',
  Cancel: 'Cancel',
  New: 'New',
  User: 'User',
  Users: 'Users',
  'User Role': 'User Role',
  'User Roles': 'User Roles',
  Bulk: 'Bulk',
  Id: 'Id',
  List: 'List',
  Name: 'Name',
  Description: 'Description',
  'Created At': 'Created At',
  'Modified At': 'Modified At',
  'First Name': 'First Name',
  'Last Name': 'Last Name',
  'Username': 'Username',
  'Filters': 'Filters',
  'Search': 'Search',
  'Cookie Consent': 'Cookie Consent',
};

phrases.custom = {
  errors: {
    unknownOtpType: 'Unknown otp type \'{0}\' detected',
    incorrectOtpPin: 'Incorrect pin supplied',
  },
  cookieConsent: {
    popUpTitle: 'Your privacy',
    popUpBody: 'By clicking "Accept all cookies", you agree we may store cookies on your device and disclose information in accordance with our <a href="/policies/cookie">Cookie Policy.<a/>',
    popUpBtn: 'Accept all cookies',
    pageHtml: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet sem dapibus, placerat orci a, euismod lacus. Mauris eget eros id ex convallis dictum sit amet vel felis. Donec lectus quam, mattis quis velit faucibus, congue finibus metus. In neque mi, tristique nec mattis ac, tristique vel dolor. Donec posuere justo orci, congue vehicula nibh luctus sit amet. Integer mi mi, dapibus ultrices tortor et, sollicitudin posuere sapien. Nulla facilisi. Proin congue arcu vel mattis molestie. Phasellus felis quam, tincidunt non eros eu, tempus sodales ligula. In euismod consectetur porta.</p>',
  },
  connection: {
    pageHtml: '<p class="display-2">You are offline.</p><p>Try:</p><ul><li>Turning off airplane mode</li><li>Turning on mobile data or Wi-Fi</li><li>Checking the signal in your area</li></ul><br><p>This message will automatically close once your connection is restored.</p>'
  }
};

export default phrases;
