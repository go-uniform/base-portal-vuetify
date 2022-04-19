<template>

  <v-menu>
    <template
      v-slot:activator="{ on, attrs }"
    >
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          v-if="icon"
        >
          {{ icon }}
        </v-icon>
        <span
          v-if="title"
        >
          {{ title }}
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <div
          v-for="(action, actionIndex) in actions"
          v-bind:key="actionIndex"
        >
          <slot
            :name="action.name"
            :item="item"
          >
            <v-btn
              class="ma-2"
              :color="action.color"
              @click="action.callback(item)"
              :block="$vuetify.breakpoint.mobile"
              :large="$vuetify.breakpoint.mobile"
            >
              <v-icon
                class="mr-2"
                v-if="action.icon"
              >
                {{ action.icon }}
              </v-icon>
              {{ translate(action.title) }}
            </v-btn>
          </slot>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script>
export default {
  name: 'button-menu',

  props: {
    icon: null,
    title: null,
    actions: [],
    item: null,
  }
}
</script>
