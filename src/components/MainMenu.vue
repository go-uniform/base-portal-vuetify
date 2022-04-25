<template>

  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    app
    clipped
    :permanent="!$vuetify.breakpoint.mobile"
  >

    <!-- Main Menu Header -->
    <v-list-item
      class="main-menu-header"
    >
      <v-list-item-content v-if="!mini">
        <v-list-item-title
          class="text-uppercase"
        >
          {{ translate('base.app.mainMenu') }}
        </v-list-item-title>
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
        class="v-list-item--dense"
        v-model="groups[index]"
        :disabled="mini && groups[index]"
        @click="closeOtherGroups(index)"
        active-class="accent white--text"
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
            dense
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
        dense
        @click="closeOtherGroups(index)"
      >

        <v-list-item-icon>
          <v-icon>{{ item.icon || '' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>

      </v-list-item>

    </template>
    <div
      style="width:100%"
      class="footer-placeholder"
    >
    </div>

  </v-navigation-drawer>

</template>

<style lang="scss" scoped>
.main-menu-header {
  // match the height of the breadcrumb toolbar
  height: 64px;
}
.v-list-item__title {
  // allow menu items to wrap for languages that have longer words than english
  white-space: normal;
}
</style>

<script>
import {bus} from '@/services/base/bus';
import {mainMenuItems} from '@/services/menu';

export default {
  name: 'main-menu',

  data: () => ({
    drawer: false,
    mini: false,
    items: mainMenuItems,
    groups: {},
  }),

  methods: {
    closeOtherGroups(index) {
      for (const key in this.groups) {
        if (`${key}` === `${index}`) {
          continue;
        }
        this.groups[key] = false;
      }
    },

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
    },

    isActive(items) {
      let oneActive = false;
      items.forEach((item) => {
        if (this.$route.path.startsWith(item.location)) {
          oneActive = true;
        }
      });
      return oneActive;
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
    this.items.forEach((item, index) => {
      if (item.children) {
        this.groups[`${index}`] = this.isActive(item.children);
      }
    });
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
