<template>

  <v-form
    ref="form"
    class="pa-8"
  >
    <v-row
      class="mb-2"
    >
      <v-expansion-panels
        accordion
        multiple
        :value="[0]"
        class="justify-start"
      >
        <v-col
          :cols="section.cols || 12"
          :xl="section.xl || section.lg || section.md || section.sm || section.xs || section.cols || 3"
          :lg="section.lg || section.md || section.sm || section.xs || section.cols || 4"
          :md="section.md || section.sm || section.xs || section.cols || 6"
          :sm="section.sm || section.xs || section.cols || 12"
          :xs="section.xs || section.cols || 12"
          v-for="(section,i) in editableSections(repository.sections)"
          :key="i"
        >
          <v-expansion-panel
          >
            <v-expansion-panel-header
              color="primary white--text"
            >
              {{ section.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="pa-8 fill-height"
            >
              <slot
                :name="'section-'+ kebabCase(section.title)"
              >
                <v-row>
                  <slot
                    v-for="fieldKey in editableFields(section.fields)"
                    :name="fieldKey"
                    :fieldKey="fieldKey"
                    :field="repository.fields[fieldKey]"
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
                      <div
                        v-if="repository.fields[fieldKey].type === 'linkId'"
                      >
                        <v-autocomplete
                          v-model="item[fieldKey]"
                          :label="format(repository.fields[fieldKey].label)"
                          :items="linkItems[fieldKey]"
                          :multiple="repository.fields[fieldKey].multiple"
                          clearable
                        ></v-autocomplete>
                      </div>
                      <div
                        v-else
                      >
                        <v-text-field
                          v-model="item[fieldKey]"
                          :label="format(repository.fields[fieldKey].label)"
                        ></v-text-field>
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
        md="6"
        class="pa-0 pa-md-4"
      >
        <v-btn
          class="ma-2"
          color="success"
          @click="save"
          large
          block
        >
          <v-icon
            class="mr-2"
          >
            mdi-content-save
          </v-icon>
          {{ format('Save') }}
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pa-0 pa-md-4"
      >
        <v-btn
          class="ma-2 grey white--text"
          @click="cancel"
          large
          block
        >
          <v-icon
            class="mr-2"
          >
            mdi-close-circle
          </v-icon>
          {{ format('Cancel') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

</template>

<script>
import {format} from '../plugins/vuetify';

export default {
  name: 'entity-edit',
  props: {
    repository: null,
    id: null,
  },
  data: () => ({
    item: {
    },
    linkItems: {
    }
  }),
  methods: {
    editableSections(sections) {
      return sections.filter((section) => {
        return this.editableFields(section.fields).length > 0;
      });
    },
    editableFields(fieldKeys) {
      return fieldKeys.filter((fieldKey) => {
        const field = this.repository.fields[fieldKey];
        return !field.readonly;
      });
    },
    linkedFields() {
      return Object.keys(this.repository.fields).filter((key) => {
        const field = this.repository.fields[key];
        return field.type === 'linkId';
      });
    },
    save() {
      if (this.$refs.form.validate()) {
        Object.keys(this.item).forEach((key) => {
          const field = this.repository.fields[key];
          if (!field || field.readonly) {
            delete(this.item[key]);
          }
        });
        if (this.$route.params.id) {
          this.repository.update(this.$route.params.id, this.item).then(() => {
            this.$router.push(`${this.repository.viewPagePrefix}/${this.$route.params.id}`);
          });
          return;
        }
        this.repository.create(this.item).then((response) => {
          this.$router.push(`${this.repository.viewPagePrefix}/${response.id}`);
        });
      }
    },

    cancel() {
      if (this.$route.params.id) {
        this.$router.push(`${this.repository.viewPagePrefix}/${this.$route.params.id}`);
        return;
      }
      this.$router.push(`${this.repository.listPage}`);
    },

    defaultCrumbs() {
      if (this.$route.params.id) {
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
            location: `${this.repository.viewPagePrefix}/${this.$route.params.id}`,
          },
          {
            title: format('Edit'),
          },
        ];
      }
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
          title: format('New'),
        },
      ];
    },

    defaultActions() {
      let cancelUrl = this.repository.listPage;
      if (this.$route.params.id) {
        cancelUrl = `${this.repository.viewPagePrefix}/${this.$route.params.id}`;
      }
      return [
        {
          icon: 'mdi-content-save',
          color: 'success',
          title: format('Save'),
          callback: () => {
            this.save();
          }
        },
        {
          icon: 'mdi-close-circle',
          class: 'white--text',
          color: 'grey',
          title: format('Cancel'),
          location: cancelUrl,
        },
      ];
    },

    links(key, field) {
      field.linkRepository.list('-createdAt').then((response) => {
        this.linkItems[key] = response.items.map((item) => {
          return {
            value: item.id,
            text: item.name,
          }
        });
        this.$forceUpdate();
      });
    }
  },

  mounted() {
    this.item = {...this.repository.default};
    if (this.id) {
      this.repository.read(this.id).then((response) => {
        // merge two objects together with second object taking priority
        this.item = {
          ...this.repository.default,
          ...response.item
        };
        this.$forceUpdate();
        this.linkedFields().forEach((key) => {
          this.links(key, this.repository.fields[key]);
        });
      }).catch(() => {
        this.$router.push(`${this.repository.listPage}`);
      });
    } else {
      this.linkedFields().forEach((key) => {
        this.links(key, this.repository.fields[key]);
      });
    }
  }
};
</script>
