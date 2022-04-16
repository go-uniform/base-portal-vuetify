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
              {{ format(field.label) }}:
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
    <v-row>
      <v-col
        class="text-center"
        cols="4"
      >
        <v-btn
          class="ma-2"
          color="error"
          @click="remove(item)"
          large
          block
        >
          <v-icon
            class="mr-2"
          >
            mdi-delete
          </v-icon>
          {{ format('Delete') }}
        </v-btn>
      </v-col>
      <v-col
        class="text-center"
        cols="4"
      >
        <v-btn
          class="ma-2"
          color="warning"
          @click="edit(item)"
          large
          block
        >
          <v-icon
            class="mr-2"
          >
            mdi-pencil
          </v-icon>
          {{ format('Edit') }}
        </v-btn>
      </v-col>
      <v-col
        class="text-center"
        cols="4"
      >
        <v-btn
          class="ma-2"
          color="info"
          @click="list"
          large
          block
        >
          <v-icon
            class="mr-2"
          >
            mdi-view-list
          </v-icon>
          {{ format('List') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {deleteConfirmation, format, formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

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
    edit() {
      this.$router.push(`${this.repository.editPagePrefix}/${this.id}`);
    },
    remove() {
      deleteConfirmation((confirmed) => {
        if (confirmed) {
          this.repository.delete(this.id).then(() => {
            this.$router.push(`${this.repository.listPage}`);
          });
        }
      });
    },
    list() {
      this.$router.push(`${this.repository.listPage}`);
    },

    defaultCrumbs() {
      return [
        {
          icon: 'mdi-home',
          title: format('Home'),
          location: '/',
        },
        {
          title: format(this.repository.title.plural),
          location: this.repository.listPage,
        },
        {
          title: format('View'),
        },
      ];
    },

    defaultActions() {
      return [
        {
          icon: 'mdi-delete',
          color: 'error',
          title: format('Delete'),
          callback: () => {
            this.remove(this.item);
          }
        },
        {
          icon: 'mdi-pencil',
          color: 'warning',
          title: format('Edit'),
          callback: () => {
            this.edit(this.item);
          }
        },
        {
          icon: 'mdi-view-list',
          color: 'info',
          title: format('List'),
          callback: () => {
            this.list();
          }
        },
      ];
    }
  },

  mounted() {
    this.repository.read(this.id).then((response) => {
      this.item = response.item;
      this.$forceUpdate();
    }).catch(() => {
      this.$router.push(`${this.repository.listPage}`);
    });
  }
};
</script>
