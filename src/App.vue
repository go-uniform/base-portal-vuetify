<template>

  <!-- provide key to ensure component is refreshed when navigating to a new path -->
  <router-view
    :key="$route.path"
  />

</template>

<script lang="ts">
import Vue from 'vue';
import {bus} from '@/services/base/bus';
import {hasDark,hasLight} from '@/plugins/theme';

let isConnected = true;

export default Vue.extend({
  name: 'App',

  created() {
    if (window && window.localStorage) {
      const dark = window.localStorage.getItem('theme.dark');
      if (hasDark && hasLight) {
        if (dark !== null) {
          this.$vuetify.theme.dark = dark !== 'false';
        }
      } else if (hasDark) {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }

    isConnected = true;
    setInterval(() => {
      const onLine = navigator.onLine;
      if (onLine && !isConnected) {
        isConnected = true;
        bus.publish('connection', isConnected);
      } else if (!onLine && isConnected) {
        isConnected = false;
        bus.publish('connection', isConnected);
      } else {
        // legacy fallback (should not be needed but just in case)
        const connectionLegacy = 'connection';
        const connectionMozilla = 'mozConnection';
        const connectionWebkit = 'webkitConnection';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const connection = navigator[connectionLegacy] || navigator[connectionMozilla] || navigator[connectionWebkit];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const downLink = connection.downlink;

        if (isConnected && downLink < 0.1) {
          isConnected = false;
          bus.publish('connection', isConnected);
        } else if (!isConnected && downLink > 0.1) {
          isConnected = true;
          bus.publish('connection', isConnected);
        }
      }
    }, 500);
  }
});
</script>

<style lang="scss">
// since footer is floating we need to ensure that we hold a space for it to float into once fully scrolled down
.footer-placeholder {
  height: 68px;
}

.v-data-table__mobile-table-row:hover, .v-data-table__mobile-table-row.v-data-table__selected {
  background: inherit !important;
}

.v-tabs-items {
  background-color: transparent !important;
}

.no-border {
  border: none;
}

.clickable {
  cursor: pointer;
}

.theme--dark {
  .v-input input {
    caret-color: #fff !important;
  }
}

.fill-width {
  width: 100%;
}
.fill-content {
  height: 100%;
  width: 100%;
}

.v-data-table__selected:not(.v-data-table__mobile-table-row) {
  color: var(--v-accent-base) !important;
  background: var(--v-accent-lighten4) !important;

  .v-input--selection-controls__input > .v-icon {
    color: var(--v-accent-base) !important;
  }
}

.theme--dark.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 3px 1px -2px rgb(200 200 200 / 20%), 0px 2px 2px 0px rgb(200 200 200 / 14%), 0px 1px 5px 0px rgb(200 200 200 / 12%);
}

.v-application, .v-navigation-drawer, .v-list {
  background-color: var(--v-background-base) !important;
}

.v-list-group--active > .v-list-group__header > .v-list-item__icon > .v-icon {
  color: #fff !important;
}

.v-expansion-panel-header.white--text .v-icon {
  color: #fff !important;
}

.v-list-item--dense > .v-list-group__header {
  min-height: 40px;
}

.fill-width {
  width: 100%;
}

a i.v-icon.v-icon {
  color: inherit;
}
</style>
