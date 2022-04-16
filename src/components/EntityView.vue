<template>

  <div>
    <v-row
      class="mb-2"
    >
      <v-expansion-panels
        accordion
        multiple
        :value="[0]"
      >
        <v-col
          cols="12"
          :lg="section.lg || 4"
          :md="section.md || 6"
          :sm="section.sm || 12"
          v-for="(section,i) in repository.sections"
          :key="i"
        >
        <v-expansion-panel>
          <v-expansion-panel-header
            color="primary"
          >
            {{ section.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="pa-8 fill-height"
          >
            <slot
              :name="'section-'+ kebabCase(section.title)"
            >
              <slot
                v-for="fieldKey in section.fields"
                :name="fieldKey"
                :fieldKey="fieldKey"
                :field="repository.fields[fieldKey]"
                :item="item"
              >
                <div
                  class="mt-4"
                  v-bind:key="fieldKey"
                >
                  <div>
                  <strong>{{ repository.fields[fieldKey].label }}</strong>
                  </div>
                  <div
                    v-if="repository.fields[fieldKey].type === 'linkId'"
                  >
                    <a
                      :href="`${repository.fields[fieldKey].linkTargetPath}/${item[fieldKey]}`"
                    >
                      {{ item[repository.fields[fieldKey].linkLabelField] }}
                    </a>
                  </div>
                  <div
                    v-else
                  >
                    {{ doFormat(fieldKey, repository.fields[fieldKey], item) }}
                  </div>
                </div>
              </slot>
            </slot>
          </v-expansion-panel-content>
        </v-expansion-panel>
        </v-col>
      </v-expansion-panels>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
        class="text-center pa-0 pa-md-4 pr-4"
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
        cols="12"
        md="4"
        class="text-center pa-0 pa-md-4 pr-4"
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
        cols="12"
        md="4"
        class="text-center pa-0 pa-md-4 pr-4"
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
