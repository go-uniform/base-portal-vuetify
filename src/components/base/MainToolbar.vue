<template>

    <v-toolbar
      v-if="crumbs && crumbs.length > 0 || actions && actions.length > 0"
    >

      <v-breadcrumbs
        v-if="crumbs && crumbs.length > 0"
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
            {{ translate(item.title) }}
            <v-menu
              v-if="item.hint"
            >

              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="ml-1"
                  color="info"
                  v-bind="attrs"
                  v-on="on"
                  small
                >
                  mdi-help-circle
                </v-icon>
              </template>

              <div>
                <v-card>
                  <v-card-title
                    class="info white--text"
                  >
                    {{ translate(item.title) }}
                    <v-spacer></v-spacer>
                    <v-icon
                      @click="on = false"
                      small
                      class="white--text"
                    >
                      mdi-close
                    </v-icon>
                  </v-card-title>
                  <v-card-text
                    class="pa-2 pa-sm-4 pa-lg-8"
                    v-html="translate(item.hint)"
                  >
                  </v-card-text>
                </v-card>
              </div>

            </v-menu>

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
            :disabled="loading"
          >
            <v-icon
              v-if="action.icon"
              class="mr-2"
            >
              {{ action.icon }}
            </v-icon>
            {{ translate(action.title) }}
          </v-btn>
        </template>

        <v-menu
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="grey"
              :disabled="loading || !selected || selected.length === 0"
              v-if="bulkActions && bulkActions.length > 0"
              tile
              v-bind="attrs"
              v-on="on"
            >
              {{ translate('$vuetify.entityList.bulk') }}
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
                :disabled="loading"
              >
                <v-icon
                  class="mr-2"
                  v-if="bulkAction.icon"
                >
                  {{ bulkAction.icon }}
                </v-icon>
                {{ translate(bulkAction.title) }}
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
    loading: Boolean,
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
