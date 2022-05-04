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

    <v-spacer
      class="mr-2 hidden-sm-and-up"
    ></v-spacer>

    <div
      class="d-flex align-center"
    >
      <v-img
        :alt="translate('$vuetify.app.headerLogoFullAlt')"
        class="shrink hidden-xs-only"
        contain
        position="left center"
        :src="getLogo($vuetify.theme.dark ? '$vuetify.app.headerLogoFullDark' : '$vuetify.app.headerLogoFullLight')"
        transition="scale-transition"
        max-height="60"
      />
      <v-img
        :alt="translate('$vuetify.app.headerLogoCompactAlt')"
        class="shrink hidden-sm-and-up"
        contain
        :src="getLogo($vuetify.theme.dark ? '$vuetify.app.headerLogoCompactDark' : '$vuetify.app.headerLogoCompactLight')"
        transition="scale-transition"
        max-height="60"
      />

      <strong
        class="display-1 ml-4 hidden-xs-only"
      >
        {{ translate('$vuetify.app.headerTitle') }}
      </strong>
    </div>

    <v-spacer></v-spacer>

    <v-menu
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
        >
          <v-btn
            class="hidden-xs-only"
            color="secondary"
            large
          >
            <small>
              {{ username || 'Unknown' }}
            </small>
            <v-icon
              right
              dark
            >
              mdi-chevron-down
            </v-icon>
          </v-btn>
          <v-icon
            class="hidden-sm-and-up"
            dark
          >
            mdi-chevron-down
          </v-icon>
        </div>
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
            {{ $vuetify.theme.dark ? translate('$vuetify.app.lightMode') : translate('$vuetify.app.darkMode') }}
          </v-list-item-title>
        </v-list-item>
        <v-divider
          v-if="items && items.length > 0"
        ></v-divider>
        <v-list-item
          v-for="(item, index) in items"
          v-bind:key="index"
          :to="item.location"
          dense
        >

          <v-list-item-icon>
            <v-icon>{{ item.icon || '' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>

        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          @click="logout"
        >
          <v-list-item-icon>
            <v-icon>mdi-lock-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ translate('$vuetify.app.logout') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>

</template>

<script>
import {bus} from '@/services/base/bus';
import {auth} from '@/services/base/auth';
import {loadingStart, translate} from '@/plugins/base/vuetify';
import {accountMenuItems} from '@/router/menu-account';

export default {
  name: 'main-header',

  data: () => ({
    items: accountMenuItems,
  }),

  computed: {
    username: () => {
      return auth.meta()['name'];
    },
  },

  methods: {
    getLogo(logo) {
      const logos = require.context('@/assets/logos', true);
      return logos('./' + translate(logo));
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
      loadingStart(7000, '$vuetify.app.loggingOut')
      auth.logout().then(() => {
        this.$router.push('/logout');
      });
    }
  }
}
</script>
