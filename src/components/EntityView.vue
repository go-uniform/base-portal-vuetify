<template>

  <v-layout
    v-if="loading"
    fill-height
    justify-center
    align-center
  >
    {{ translate('base.app.loading') }}
  </v-layout>
  <div
    v-else
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
          v-for="(section,i) in repository.sections"
          :key="i"
        >
          <v-expansion-panel>

            <v-expansion-panel-header
              color="primary white--text"
            >
              <strong>
                {{ translate(section.title) }}
              </strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="pa-2 pa-sm-4 pa-lg-8 fill-height"
            >
              <slot
                :name="'section-'+ kebabCase(section.title)"
              >
                <v-row>
                  <slot
                    v-for="fieldKey in section.fieldKeys"
                    :set="field = repository.fields[fieldKey]"
                    :name="fieldKey"
                    :field-key="fieldKey"
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
                      v-bind:key="fieldKey"
                    >
                      <entity-field-view
                        :repository="repository"
                        :field="field"
                        :value="item[fieldKey]"
                        :field-key="fieldKey"
                        :item="item"
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
        md="4"
        class="text-center pa-0 pa-md-4 pr-4"
        v-for="(action, index) in actions"
        v-bind:key="index"
      >

        <v-btn
          class="ma-2"
          :color="action.color"
          @click="action.callback(item)"
          large
          block
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

  </div>

</template>

<script>
import {deleteConfirmation, loadingStart, toastError, translate} from '../plugins/vuetify';
import EntityFieldView from './EntityFieldView';
import {defaultViewActions} from '../services/base/entity.helper.default-view-actions';
import {defaultViewCrumbs} from '../services/base/entity.helper.default-view-crumbs';

export default {
  name: 'entity-view',
  components: {EntityFieldView},

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
        if (['linkLabel','selfReferenceLabel'].includes(field.type)) {
          return;
        }
        response[key] = this.repository.fields[key];
      });

      return response;
    },

    actions() {
      return defaultViewActions(this.remove, this.edit, this.list);
    },
  },

  data: () => ({
    panels: [0],
    item: {},
    loading: true,
  }),

  methods: {
    edit() {
      this.$router.push(`${this.repository.editPagePrefix}/${this.id}`);
    },

    remove() {
      deleteConfirmation((confirmed) => {
        if (confirmed) {
          loadingStart(7000, 'base.app.deleting');
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
      return defaultViewCrumbs(this.repository);
    },

    defaultActions() {
      return defaultViewActions(this.remove, this.edit, this.list);
    }
  },

  mounted() {
    this.loading = true;
    this.$emit('loading', this.loading);
    this.repository.read(this.id).then((response) => {
      this.item = response.item;
      this.loading = false;
      this.$emit('loading', this.loading);
      this.$forceUpdate();
    }).catch((reason) => {
      const message = reason.headers.get('Message') ?? translate('base.errors.general');
      toastError(message)
    });
  },
};
</script>
