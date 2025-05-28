<template>

  <div>

    <v-autocomplete
      label="Timezone"
      prepend-icon="mdi-map-clock"
      :items="timezones"
      :value="value"
      @input="$emit('input', $event)"
    >
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title>
              <span class="grey--text text--lighten-1">({{ data.item.utc }})</span>&nbsp;{{ data.item.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
              <span class="grey--text text--lighten-1">{{ data.item.time }}</span>
            </v-list-item-action-text>
          </v-list-item-action>
        </template>
      </template>
    </v-autocomplete>

  </div>

</template>

<script>
import {loadTimezones} from "@/locale/base/timezones";

export default {
  name: 'timezone-selector',

  props: {
    value: String,
  },

  data: () => ({
    timezones: loadTimezones(),
  }),
}
</script>
