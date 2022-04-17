<template>

  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    app
    clipped
    :permanent="!$vuetify.breakpoint.mobile"
  >

    <!-- Main Menu Header -->
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

    <!-- Main Menu Items -->
    <template
      v-for="(item, index) in items"
    >

      <!-- Main Menu Group Item -->
      <v-list-group
        v-if="item.children && item.children.length > 0"
        v-bind:key="index"
        :prepend-icon="item.icon"
      >

        <template v-slot:activator>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </template>
        <template
          v-for="(child, childIndex) in item.children"
        >

          <v-list-item
            v-if="!mini"
            v-bind:key="childIndex"
            :to="child.location"
          >

            <v-list-item-icon>
              <v-icon>{{ child.icon || '' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ child.title }}</v-list-item-title>

          </v-list-item>

        </template>

      </v-list-group>

      <!-- Main Menu Single Item -->
      <v-list-item
        v-else
        v-bind:key="index"
        :to="item.location"
      >

        <v-list-item-icon>
          <v-icon>{{ item.icon || '' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>

      </v-list-item>

    </template>

  </v-navigation-drawer>

</template>

<script>
import {bus} from '@/services/bus';
import {mainMenuItems} from '@/services/menu';

export default {
  name: 'main-menu',

  data: () => ({
    drawer: false,
    mini: false,
    items: mainMenuItems
  }),

  methods: {
    toggle() {
      let open = !this.mini;
      if (this.$vuetify.breakpoint.mobile) {
        open = this.drawer;
      }

      if (open) {
        this.close();
      } else {
        this.open();
      }
    },

    open() {
      this.drawer = true;
      this.mini = false;

      if (!this.$vuetify.breakpoint.mobile) {
        if (window && window.sessionStorage) {
          window.sessionStorage.setItem('nav.mini', this.mini.toString());
        }
      }
    },

    close() {
      this.drawer = false;
      this.mini = false;

      if (!this.$vuetify.breakpoint.mobile) {
        this.drawer = true;
        this.mini = true;

        if (window && window.sessionStorage) {
          window.sessionStorage.setItem('nav.mini', this.mini.toString());
        }
      }
    }
  },

  created() {
    bus.subscribe('menu.toggle', () => {
      this.toggle();
    });
    bus.subscribe('menu.open', () => {
      this.open();
    });
    bus.subscribe('menu.close', () => {
      this.close();
    });
  },

  mounted() {
    // load expected menu state from local browser session storage
    if (window && window.sessionStorage) {
      const mini = window.sessionStorage.getItem('nav.mini');
      if (mini !== null) {
        this.mini = mini === 'true';
      }
    }
  }
}
</script>
