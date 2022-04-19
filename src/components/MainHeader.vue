<template>

  <v-app-bar
    app
    color="primary"
    dark
    clipped-left
  >
    <v-icon
      class="mr-2 hidden-md-and-up"
      @click="menuOpen"
    >
      mdi-menu
    </v-icon>
    <div
      @click="navigateHome"
      class="d-flex align-center"
    >
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-menu
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          tile
          large
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          {{ username || 'Unknown' }}
          <v-icon
            right
            dark
          >
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list
        dense
      >
        <v-list-item
          @click="toggleThemeMode"
        >
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $vuetify.theme.dark ? formatString('Light Mode') : formatString('Dark Mode') }}
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          to="/my-account"
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Account</v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/settings"
        >
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>System Settings</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          @click="logout"
        >
          <v-list-item-icon>
            <v-icon>mdi-lock-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>

</template>

<script>
import {bus} from '@/services/base/bus';
import {auth} from '@/services/base/auth';

export default {
  name: 'main-header',

  computed: {
    username: () => {
      return auth.meta()['name'];
    }
  },

  methods: {
    navigateHome() {
      this.$router.push('/');
    },

    menuOpen() {
      bus.publish('menu.open', null);
    },

    toggleThemeMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (window && window.localStorage) {
        window.localStorage.setItem('theme.dark', this.$vuetify.theme.dark.toString());
      }
    },

    logout() {
      auth.logout().then(() => {
        this.$router.push('/logout');
      });
    }
  }
}
</script>
