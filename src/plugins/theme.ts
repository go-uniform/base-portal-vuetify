import {ThemeOptions} from 'vuetify/types/services/theme';

const theme: ThemeOptions = {
  options: {
    customProperties: true,
  },
  dark: true,
  themes: {
    dark: {
      background: '#333',
      primary: '#1a61b6',
      secondary: '#347bd1',
      accent: '#398bee',
      anchor: '#398bee',
      success: '#3dcc79',
      warning: '#ffbe4f',
      danger: '#ff695b',
      info: '#2b9ace',
    },
    light: {
      background: '#eee',
      primary: '#1a61b6',
      secondary: '#347bd1',
      accent: '#398bee',
      anchor: '#1a61b6',
      success: '#3dcc79',
      warning: '#ffbe4f',
      danger: '#ff695b',
      info: '#2b9ace',
    }
  }
};

export const hasDark = theme.themes?.dark !== undefined;
export const hasLight = theme.themes?.light !== undefined;

export default theme;
