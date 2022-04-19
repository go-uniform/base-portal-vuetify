<template>

  <v-form
    ref="form"
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
          v-for="(section,i) in editableSections(repository.sections)"
          :key="i"
        >
          <v-expansion-panel
          >
            <v-expansion-panel-header
              color="primary white--text"
            >
              <strong>{{ translate(section.title) }}</strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="pa-8 fill-height"
            >
              <slot
                :name="'section-'+ kebabCase(section.title)"
              >
                <v-row>
                  <slot
                    v-for="fieldKey in editableFields(section.fieldKeys)"
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
                      <div
                        v-if="field.type === 'linkId'"
                      >
                        <v-autocomplete
                          v-model="item[fieldKey]"
                          :label="translate(field.label)"
                          :items="linkItems[fieldKey]"
                          :multiple="field.multiple"
                          clearable
                          :rules="[rules.required(field.optional)]"
                        ></v-autocomplete>
                      </div>
                      <div
                        v-else-if="field.type === 'textarea'"
                      >
                        <v-textarea
                          v-model="item[fieldKey]"
                          :label="translate(field.label)"
                          :counter="field.length"
                          :maxlength="field.length"
                          :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
                        >
                        </v-textarea>
                      </div>
                      <div
                        v-else
                      >
                        <v-text-field
                          v-model="item[fieldKey]"
                          :label="translate(field.label)"
                          :counter="field.length"
                          :maxlength="field.length"
                          :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
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
        class="text-center pa-0 pa-md-4 pr-4"
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
          {{ translate('base.app.save') }}
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="text-center pa-0 pa-md-4 pr-4"
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
          {{ translate('base.app.cancel') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

</template>

<script>
import {translate} from '../plugins/vuetify';
import {validations} from '../services/base/validations';

export default {
  name: 'entity-edit',
  props: {
    repository: null,
    id: null,
  },
  data: () => ({
    panels: [0],
    item: {
    },
    linkItems: {
    },
    rules: {
      required: validations.required,
      pattern: validations.pattern,
      length: validations.length,
    }
  }),
  methods: {
    editableSections(sections) {
      return sections.filter((section) => {
        return this.editableFields(section.fieldKeys).length > 0;
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
            title: translate('base.home.pageTitle'),
            location: '/',
          },
          {
            title: translate(this.repository.title.plural),
            location: this.repository.listPage,
          },
          {
            title: translate('base.entityEdit.view'),
            location: `${this.repository.viewPagePrefix}/${this.$route.params.id}`,
          },
          {
            title: translate('base.entityEdit.edit'),
          },
        ];
      }
      return [
        {
          icon: 'mdi-home',
          title: translate('base.home.pageTitle'),
          location: '/',
        },
        {
          title: translate(this.repository.title.plural),
          location: this.repository.listPage,
        },
        {
          title: translate('base.entityEdit.new'),
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
          title: translate('base.app.save'),
          callback: () => {
            this.save();
          }
        },
        {
          icon: 'mdi-close-circle',
          class: 'white--text',
          color: 'grey',
          title: translate('base.app.cancel'),
          location: cancelUrl,
        },
      ];
    },

    links(key, field) {
      field.linkRepository.list().then((response) => {
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
