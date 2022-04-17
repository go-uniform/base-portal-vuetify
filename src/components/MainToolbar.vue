<template>

    <v-toolbar
      v-if="crumbs && crumbs.length > 1 || actions && actions.length > 0"
    >

      <v-breadcrumbs
        v-if="crumbs && crumbs.length > 1"
        :items="crumbs"
      >

        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">

          <v-breadcrumbs-item
            :to="item.location ? item.location : (item.callback ? '#' : null)"
            class="text-subtitle-2 crumb-item"
            :disabled="item.disabled"
            exact
            @click="callback(item.callback)"
          >
            <v-icon
              v-if="item.icon"
              class="mr-2"
            >
              {{ item.icon }}
            </v-icon>
            {{ format(item.title) }}
          </v-breadcrumbs-item>

        </template>

      </v-breadcrumbs>
      <v-spacer/>
      <div
        v-if="!$vuetify.breakpoint.mobile"
      >
        <template
          v-for="(action, index) in actions"
        >
          <v-btn
            v-bind:key="index"
            :color="action.color"
            :to="action.location"
            tile
            :class="action.class"
            @click="callback(action.callback)"
          >
            <v-icon
              v-if="action.icon"
              class="mr-2"
            >
              {{ action.icon }}
            </v-icon>
            {{ format(action.title) }}
          </v-btn>
        </template>

        <v-menu
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="grey"
              :disabled="!selected || selected.length === 0"
              v-if="bulkActions && bulkActions.length > 0"
              tile
              v-bind="attrs"
              v-on="on"
            >
              {{ format('Bulk') }}
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
              v-for="(bulkAction, index) in bulkActions"
              v-bind:key="index"
            >
              <v-btn
                :color="bulkAction.color"
                @click="bulk(bulkAction)"
                block
              >
                <v-icon
                  class="mr-2"
                  v-if="bulkAction.icon"
                >
                  {{ bulkAction.icon }}
                </v-icon>
                {{ format(bulkAction.title) }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

    </v-toolbar>

</template>

<script>
import {bus} from '@/services/base/bus';

export default {
  name: 'main-toolbar',

  props: {
    crumbs: Array,
    actions: Array,
    bulkActions: Array,
    bulkActionHandler: Function,
  },

  data: () => ({
    selected: [],
  }),

  methods: {
    callback: (handler) => {
      if (handler) {
        handler();
      }
    },

    bulk(action) {
      this.bulkActionHandler(action, this.selected)
    }
  },

  created() {
    bus.subscribe('list.selected', (value) => {
      this.selected = value;
    });
  }
}
</script>
