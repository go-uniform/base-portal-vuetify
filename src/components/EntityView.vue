<template>

  <div
    class="pa-8 text-center"
  >
    <table
      class="mx-auto"
    >
      <tr
        v-for="(field, key) in fields"
        :key="key"
      >
        <td
          class="text-left"
        >
          <slot
            :name="labelName(key)"
          >
            <strong>
              {{ __(field.label) }}:
            </strong>
          </slot>
        </td>
        <td
          class="text-right"
        >
          <slot
            :name="valueName(key)"
          >
            <a
              v-if="field.type === 'linkId'"
              :href="`${repository.fields[key].linkTargetPath}/${item.id}`"
            >
              {{ item[repository.fields[key].linkLabelField] }}
            </a>
            <span
              v-else
            >
              {{ doFormat(key, field, item) }}
            </span>
          </slot>
        </td>
      </tr>
    </table>
    <br>
    <v-btn
      class="ma-2"
      color="warning"
      @click="edit(item)"
    >
      <v-icon
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
      {{ __('Edit') }}
    </v-btn>
    <br>
    <v-btn
      class="ma-2"
      color="error"
      @click="remove(item)"
    >
      <v-icon
        class="mr-2"
      >
        mdi-delete
      </v-icon>
      {{ __('Delete') }}
    </v-btn>
  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

export default {
  name: 'entity-view',
  props: {
    repository: null,
    id: null,
  },
  computed: {
    fields() {
      if (!this.repository) {
        return {};
      }

      let response = {};
      Object.keys(this.repository.fields).map((key, index) => {
        const field = this.repository.fields[key];
        if (['linkLabel'].includes(field.type)) {
          return;
        }
        response[key] = this.repository.fields[key];
      });

      return response;
    },
  },
  data: () => ({
    item: {},
  }),
  methods: {
    labelName(key) {
      return `label.${key}`;
    },
    valueName(key) {
      return `item.${key}`;
    },
    doFormat(key, field, item) {
      let value = item[key];
      switch (field.type) {
        case "boolean":
          value = formatBoolean(value);
          break
        case "date":
          value = formatDate(value);
          break
        case "datetime":
          value = formatDatetime(value);
          break
      }
      return value;
    },
    edit(item) {
      this.$router.push(`${this.repository.editPagePrefix}/${item.id}`);
    },
    remove(item) {
      // todo: show confirmation box
      this.repository.delete(item.id).then(() => {
        this.$router.push(`${this.repository.listPage}`);
      });
    },
  },
  mounted() {
    this.repository.read(this.id).then((response) => {
      this.item = response.item;
    }).catch(() => {
      this.$router.push(`${this.repository.listPage}`);
    });
  }
};
</script>
