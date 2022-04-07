<template>
  <v-app>

    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <div class="d-flex align-center">
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
            to="/users/edit/me"
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

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      clipped
      bottom
    >

      <v-list-item>
        <v-list-item-content v-if="!mini">
          <v-list-item-title>MAIN MENU</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon
          @click.stop="toggle"
        >
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-group
        :value="true"
        prepend-icon="mdi-account"
      >
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>
        <v-list-item
          v-if="!mini"
          to="/users"
        >
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!mini"
          to="/user-roles"
        >
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-title>User Roles</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
      <div
        style="height:62px;"
      >
      </div>
    </v-main>

    <v-footer
      padless
      class="text-center"
      fixed
      style="z-index:4;"
    >
      <v-card
        flat
        tile
        width="100%"
        color="primary"
      >
        <v-card-text
          class="white--text py-2"
        >
          <div>
            <strong>Uniform</strong> - {{ new Date().getFullYear() }}
          </div>
          <div>
            <small>v1.0</small>
          </div>
        </v-card-text>
      </v-card>
    </v-footer>

    <toast-bar/>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {auth} from '@/services/auth';

export default Vue.extend({
  name: 'main-layout',

  data: () => ({
    drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    mini: false,
    username: null,
  }),

  methods: {
    logout() {
      auth.logout().then(() => {
        this.$router.push('/logout');
      });
    },
    toggle() {
      this.mini = !this.mini;
      if (window && window.sessionStorage) {
        window.sessionStorage.setItem('nav.mini', this.mini.toString());
      }
    }
  },

  mounted() {
    if (window && window.sessionStorage) {
      const mini = window.sessionStorage.getItem('nav.mini');
      if (mini !== null) {
        this.mini = mini == 'true';
      }
    }
    const meta = auth.meta();
    if (meta.username) {
      this.username = meta.username;
    }
    window.addEventListener('keypress', (ev) => {
      if (['Enter'].includes(ev.code)) {
        this.$emit('keypress.enter');
      }
    });
  }
});
</script>

