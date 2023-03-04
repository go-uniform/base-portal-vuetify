import en from 'vuetify/src/locale/en';
import {extend} from '@/locale/base/base';

export default extend(en, {
  validations: {
    saveFailed: 'Some fields failed validation so the change were not saved.',
    required: 'May not be empty',
    email: 'Must be a valid email address',
    length: 'May not be more than {0} characters long.',
  },
  errors: {
    unknownBulkAction: 'Unknown bulk action \'{0}\' request received on entity \'{1}\'',
    missingFilterType: 'A filter control for \'{0}\' has not bee implemented yet',
    general: 'Something went wrong',
    recordNotFound: 'The record could not be found',
    accountDoesNotExist: 'No account could be found for the given username/email',
    invalidCredentials: 'Invalid username/email or password given',
    unknownOtpType: 'Unknown OTP type \'{0}\' detected',
    incorrectOtpPin: 'Incorrect OTP supplied',
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

    noData: 'No data available',
    homeComingSoon: 'dashboard widgets/metrics will go here',
    reportComingSoon: 'report view will go here',
    loading: 'Loading...',
    loadingTimeout: 'Operation was automatically cancelled since system took to long to respond',
    loggingOut: 'Logging out...',
    deleting: 'Deleting data...',
    submitting: 'Submitting data...',
    submittedSuccessfully: 'Data successfully submitted',
    scrollTop: 'Scroll Top',
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
    optionNotSetColor: 'accent',
    optionNotSetIcon: 'mdi-cancel',
    optionNotSetTitle: 'Not Populated',
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
    resent: 'A new one time pin (OTP) has been sent to you',
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
    pageTitle: 'Dashboards',
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
    new: 'New',
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
  entityCards: {
    title: 'List',
    actions: 'Actions',
    new: 'New',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    bulk: 'Bulk',
    bulkActionConfirmationTitle: 'Are you sure?',
    bulkActionConfirmationMessage: 'You are about to {0} {1} record(s), are you sure you want to do this?',
    load: 'Load More',
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
  },
  empty: 'empty',
  menu: {
    reports: {
      title: 'Reports',
      icon: 'mdi-chart-box',
      example1: {
        title: 'Example 1',
      }
    },
    users: {
      title: 'Users',
      icon: 'mdi-account',
    },
    events: {
      title: 'Events',
      icon: 'mdi-calendar',
    },
  },
  users: {
    singular: 'User',
    plural: 'Users',
    sections: {
      general: 'General',
      attributes: 'Attributes',
      permissions: 'Permissions',
    },
    virtual: {
      name: 'Name',
    },
    fields: {
      id: 'Id',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email',
      userRole: 'User Role',
      parentUser: 'Parent User',
      attributes: {
        title: 'Attributes',
        sex: 'Sex',
        age: 'Age',
      },
      permissions: {
        title: 'Permissions',
        usersListOwner: 'Users List Owner',
        usersCreateOwner: 'Users Create Owner',
      },
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
  },
  userRoles: {
    singular: 'User Role',
    plural: 'User Roles',
    sections: {
      general: 'General',
      permissions: 'Permissions',
    },
    fields: {
      id: 'Id',
      status: 'Status',
      name: 'Name',
      description: 'Description',
      super: 'Super',
      permissions: {
        title: 'Permissions',
        usersListOwner: 'Users List Owner',
        usersCreateOwner: 'Users Create Owner',
      },
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
    hints: {
      super: 'A super user role has access to everything but can explicitly be denied permissions.',
    },
    enums: {
      status: {
        pending: {
          title: 'Pending',
          icon: 'mdi-timer-sand-full',
          color: 'grey',
        },
        approved: {
          title: 'Approved',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        rejected: {
          title: 'Rejected',
          icon: 'mdi-close-thick',
          color: 'danger',
        }
      }
    }
  },
  userAttributes: {
    singular: 'User Attribute',
    plural: 'User Attributes',
    sections: {
      general: 'General',
    },
    fields: {
      id: 'Id',
      type: 'Type',
      key: 'Key',
      name: 'Name',
      description: 'Description',
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
    enums: {
      type: {
        text: {
          title: 'Type',
        }
      }
    }
  },
  permissions: {
    singular: 'Permission',
    plural: 'Permissions',
    enums: {
      type: {
        inherit: {
          title: 'Inherit',
          icon: 'mdi-arrow-up-left',
          color: 'grey',
        },
        allow: {
          title: 'Allow',
          icon: 'mdi-check-bold',
          color: 'success',
        },
        deny: {
          title: 'Deny',
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
      general: 'General',
    },
    fields: {
      title: 'Title',
      description: 'Description',
      createdAt: 'Created At',
    },
    noData: 'You have no dashboards, why not create your first dashboard now.',
  },
  reports: {
    pageTitle: 'Reports',
    singular: 'Report',
    plural: 'Reports',
    sections: {
      general: 'General',
    },
    fields: {
      title: 'Title',
      description: 'Description',
      createdAt: 'Created At',
    },
  },
  account: {
    pageTitle: 'My Account',
    icon: 'mdi-account'
  },
  settings: {
    pageTitle: 'Settings',
    icon: 'mdi-cogs'
  },
  customizations: {
    pageTitle: 'Customizations',
    icon: 'mdi-application-cog-outline'
  },
  events: {
    singular: 'Event',
    plural: 'Events',
    sections: {
      general: 'General',
    },
    fields: {
      id: 'Id',
      title: 'Title',
      description: 'Description',
      startAt: 'Start At',
      endAt: 'End At',
      modifiedAt: 'Modified At',
      createdAt: 'Created At',
    },
  },
});
