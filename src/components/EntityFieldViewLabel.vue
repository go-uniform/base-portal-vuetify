<!-- render data for any given field based on field type and properties -->
<template>

  <div>
    <strong>

      {{ translate(field.label) }}
      <span
        v-if="!field.optional"
        class="danger--text"
      >
        *
      </span>

    </strong>
    <v-menu
      v-if="field.hint"
    >

      <template v-slot:activator="{ on, attrs }">
        <v-icon
          class="mb-1"
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
            {{ translate(field.label) }}
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
            v-html="translate(field.hint)"
          >
          </v-card-text>
        </v-card>
      </div>

    </v-menu>
  </div>

</template>

<script>
export default {
  name: 'entity-field-view-label',

  props: {
    field: null,
  },

  methods: {
  },
};
</script>
