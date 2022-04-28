<template>

  <v-layout
    v-if="loading"
    fill-height
    justify-center
    align-center
  >
    {{ translate('$vuetify.app.loading') }}
  </v-layout>
  <v-layout
    v-else-if="submitting"
    fill-height
    justify-center
    align-center
  >
    {{ translate('$vuetify.app.submitting') }}
  </v-layout>
  <v-form
    v-else
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
          :cols="section.getCols()"
          :xl="section.getXl()"
          :lg="section.getLg()"
          :md="section.getMd()"
          :sm="section.getSm()"
          :xs="section.getXs()"
          v-for="(section,i) in editableSections(repository.sections)"
          :key="i"
        >
          <v-expansion-panel
          >

            <v-expansion-panel-header
              color="primary white--text"
            >
              <strong>
                {{ translate(section.title) }}
              </strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="pa-1 pa-sm-4 pa-lg-8 fill-height"
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
                      :cols="section.getChildCols()"
                      :xl="section.getChildXl()"
                      :lg="section.getChildLg()"
                      :md="section.getChildMd()"
                      :sm="section.getChildSm()"
                      :xs="section.getChildXs()"
                      v-for="attribute in attributes[fieldKey]"
                      v-bind:key="`${fieldKey}${attribute.key}`"
                    >

                      <entity-field-edit
                        :repository="repository"
                        :item="item"
                        :field-key="fieldKey"
                        :field="field"
                        :attribute="attribute"
                        :value="attribute.key ? item[fieldKey][attribute.key] : item[fieldKey]"
                        @input="attribute.key ? item[fieldKey][attribute.key] = $event : item[fieldKey] = $event"
                      />

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
        v-for="(action, index) in actions"
        v-bind:key="index"
      >
        <v-btn
          :class="action.class"
          class="ma-2"
          :color="action.color"
          :to="action.location"
          @click="action.callback(item)"
          large
          block
          :disabled="loading || submitting"
        >

          <v-icon
            v-if="action.icon"
            class="mr-2"
          >
            {{ action.icon }}
          </v-icon>
          {{ action.title }}

        </v-btn>
      </v-col>
    </v-row>

  </v-form>

</template>

<script>
import EntityFieldEdit from './EntityFieldEdit';
import {defaultEditCrumbs} from '../../services/base/entity.helper.default-edit-crumbs';
import {defaultEditActions} from '../../services/base/entity.helper.default-edit-actions';
import {toastError, toastSuccess, translate} from '../../plugins/base/vuetify';

export default {
  name: 'entity-edit',
  components: {EntityFieldEdit},
  props: {
    repository: null,
    id: null,
  },
  data: () => ({
    submitting: false,
    loading: true,
    panels: [0],
    item: {},
    attributes: {},
  }),

  computed: {
    actions() {
      return defaultEditActions(this.repository, this.$route.params.id, this.save);
    }
  },

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
    save() {
      if (this.$refs.form.validate()) {
        Object.keys(this.item).forEach((key) => {
          const field = this.repository.fields[key];
          if (!field || field.readonly) {
            delete (this.item[key]);
          }
        });
        this.submitting = true;
        this.$emit('submitting', this.submitting);
        if (this.$route.params.id) {
          this.repository.update(this.$route.params.id, this.item).then(() => {
            toastSuccess('$vuetify.app.submittedSuccessfully');
            this.$router.push(`${this.repository.viewPagePrefix}/${this.$route.params.id}`);
          }).finally(() => {
            this.submitting = false;
            this.$emit('submitting', this.submitting);
          });
          return;
        }
        this.repository.create(this.item).then((response) => {
          toastSuccess('$vuetify.app.submittedSuccessfully');
          this.$router.push(`${this.repository.viewPagePrefix}/${response.item.id}`);
        }).finally(() => {
          this.submitting = false;
          this.$emit('submitting', this.submitting);
        });
      } else {
        toastError('$vuetify.validations.saveFailed');
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
      return defaultEditCrumbs(this.repository, this.$route.params.id);
    },

    defaultActions() {
      return defaultEditActions(this.repository, this.$route.params.id, this.save);
    },
  },

  mounted() {
    this.item = {...this.repository.default};

    if (this.id) {
      this.loading = true;
      this.$emit('loading', this.loading);
      this.item.id = this.id;
      this.repository.read(this.id).then((response) => {
        // merge two objects together with second object taking priority
        this.item = {
          ...this.repository.default,
          ...response.item
        };
        this.loading = false;
        this.$emit('loading', this.loading);
        this.$forceUpdate();

        this.attributes = {};
        Object.keys(this.repository.fields).forEach((fieldKey) => {
          const field = this.repository.fields[fieldKey];
          this.attributes[fieldKey] = [
            {
              key: ''
            }
          ];
          if (field.type === 'attributes') {
            if (this.item[fieldKey] === undefined) {
              this.item[fieldKey] = {};
            }
            field.attributeRepository.list().then((response) => {
              this.attributes[fieldKey] = [];
              response.items.forEach((item) => {
                this.attributes[fieldKey].push(item);
                if (this.item[fieldKey][item.key] === undefined) {
                  this.item[fieldKey][item.key] = null;
                }
              });
              this.$forceUpdate();
            });
          }
        });
      }).catch((reason) => {
        const message = reason.headers.get('Message') ?? translate('$vuetify.errors.general');
        toastError(message)
      });
    } else {
      this.loading = false;
      this.$emit('loading', this.loading);

      this.attributes = {};
      Object.keys(this.repository.fields).forEach((fieldKey) => {
        const field = this.repository.fields[fieldKey];
        this.attributes[fieldKey] = [
          {
            key: ''
          }
        ];
        if (field.type === 'attributes') {
          if (this.item[fieldKey] === undefined) {
            this.item[fieldKey] = {};
          }
          field.attributeRepository.list().then((response) => {
            this.attributes[fieldKey] = [];
            response.items.forEach((item) => {
              this.attributes[fieldKey].push(item);
              if (this.item[fieldKey][item.key] === undefined) {
                this.item[fieldKey][item.key] = null;
              }
            });
            this.$forceUpdate();
          });
        }
      });
    }
  },

  created() {
    this.item.id = this.id;
  }
};
</script>
