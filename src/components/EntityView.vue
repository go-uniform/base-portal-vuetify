<template>

  <div
    class="fill-width"
  >
    <v-row
      class="mb-2"
    >
      <v-expansion-panels
        accordion
        multiple
        :value="panels"
        class="justify-start"
      >
        <v-col
          :cols="section.cols || 12"
          :xl="section.xl || section.lg || section.md || section.sm || section.xs || section.cols || 12"
          :lg="section.lg || section.md || section.sm || section.xs || section.cols || 12"
          :md="section.md || section.sm || section.xs || section.cols || 12"
          :sm="section.sm || section.xs || section.cols || 12"
          :xs="section.xs || section.cols || 12"
          v-for="(section,i) in repository.sections"
          :key="i"
        >
        <v-expansion-panel>
          <v-expansion-panel-header
            color="primary white--text"
          >
            <strong>{{ section.title }}</strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            class="pa-8 fill-height"
          >
            <slot
              :name="'section-'+ kebabCase(section.title)"
            >
              <v-row>
              <slot
                v-for="fieldKey in section.fieldKeys"
                :set="field = repository.fields[fieldKey]"
                :name="fieldKey"
                :fieldKey="fieldKey"
                :field="field"
                :item="item"
              >
                <v-col
                  :cols="section.childCols || 12"
                  :xl="section.childXl || section.childLg || section.childMd || section.childSm || section.childXs || section.childCols || 12"
                  :lg="section.childLg || section.childMd || section.childSm || section.childXs || section.childCols || 12"
                  :md="section.childMd || section.childSm || section.childXs || section.childCols || 12"
                  :sm="section.childSm || section.childXs || section.childCols || 12"
                  :xs="section.childXs || section.childCols || 12"
                  v-bind:key="fieldKey"
                >
                  <div>
                    <strong>{{ field.label }}</strong>
                  </div>
                  <div
                    v-if="field.type === 'linkId'"
                  >
                    <a
                      :href="`${field.linkRepository.viewPagePrefix}/${item[fieldKey]}`"
                    >
                      {{ item[field.linkLabelFieldKey] }}
                    </a>
                  </div>
                  <div
                    v-else
                  >
                    {{ doFormat(fieldKey, field, item) }}
                  </div>
                </v-col>
              </slot>
              </v-row>
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
          {{ translate('custom.entityView.delete') }}
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
          {{ translate('custom.entityView.edit') }}
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
          {{ translate('custom.entityView.list') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {deleteConfirmation, translate, formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

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
      Object.keys(this.repository.fields).map((key) => {
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
    panels: [0],
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
          title: translate('custom.home.pageTitle'),
          location: '/',
        },
        {
          title: translate(this.repository.title.plural),
          location: this.repository.listPage,
        },
        {
          title: translate('custom.entityView.view'),
        },
      ];
    },

    defaultActions() {
      return [
        {
          icon: 'mdi-delete',
          color: 'error',
          title: translate('custom.entityView.delete'),
          callback: () => {
            this.remove(this.item);
          }
        },
        {
          icon: 'mdi-pencil',
          color: 'warning',
          title: translate('custom.entityView.edit'),
          callback: () => {
            this.edit(this.item);
          }
        },
        {
          icon: 'mdi-view-list',
          color: 'info',
          title: translate('custom.entityView.list'),
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
