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
        </div>

    </v-toolbar>

</template>

<script>
export default {
  name: 'main-toolbar',

  props: {
    crumbs: Array,
    actions: Array,
  },

  methods: {
    callback: (handler) => {
      if (handler) {
        handler();
      }
    }
  }
}
</script>
