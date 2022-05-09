<template>

  <v-expansion-panels
    v-if="filterableFieldKeys.length > 0 || repository.freeTextSearch"
    class="justify-start mb-2 mb-sm-4 mb-lg-8"
    v-model="filterPanelValue"
    :disabled="disabled"
  >

    <v-expansion-panel>

      <v-expansion-panel-header
        :color="disabled ? 'grey white--text' : 'primary white--text'"
      >
        <strong
          class="text-uppercase"
        >
          <v-icon
            class="mr-2"
          >
            mdi-magnify
          </v-icon>
          {{ translate('$vuetify.entityFilters.title') }}
        </strong>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form
          ref="form"
        >

          <v-row
            class="pt-8 pb-0"
          >
            <v-col
              cols="12"
              md="6"
              xl="4"
              v-if="repository.freeTextSearch"
            >
              <entity-field-view-label
                :field="{ label: '$vuetify.entityFilters.freeTextSearch' }"
                hide-required
              />
              <v-text-field
                v-model="freeTextSearch"
                filled
              >
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              xl="4"
              v-for="fieldKey in filterableFieldKeys"
              v-bind:key="fieldKey"
            >
              <entity-list-filter-field
                :field="repository.fields[fieldKey]"
                v-model="filters[fieldKey]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-divider></v-divider>
            </v-col>
            <v-col
              cols="6"
              class="text-left"
            >
              <v-btn
                color="orange white--text"
                tile
                @click="reset"
              >
                <v-icon>
                  mdi-close-thick
                </v-icon>
                {{ translate('$vuetify.entityFilters.reset') }}
              </v-btn>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                color="success"
                tile
                @click="search"
              >
                <v-icon>
                  mdi-magnify
                </v-icon>
                {{ translate('$vuetify.entityFilters.search') }}
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>
<script>
import EntityListFilterField from './EntityListFilterField';
import {bus} from '../../services/base/bus';
import EntityFieldViewLabel from './EntityFieldViewLabel';

export default {
  name: 'entity-list-filters',
  components: {EntityFieldViewLabel, EntityListFilterField},
  props: {
    repository: null,
    value: null,
    disabled: Boolean,
  },

  data: () => ({
    freeTextSearch: null,
    filterPanelValue: null,
    filters: {},
  }),

  watch: {
    filters: {
      handler() {
        Object.keys(this.filters).forEach((key) => {
          const value = this.filters[key];
          if (value && value.length === 0) {
            delete(this.filters[key]);
          }
        });
      },
      deep: true,
    },
  },

  computed: {
    filterableFieldKeys() {
      if (!this.repository) {
        return [];
      }

      const fieldKeys = [];
      Object.keys(this.repository.fields).forEach((key) => {
        const field = this.repository.fields[key];
        if (field.filterable) {
          fieldKeys.push(key);
        }
      })

      return fieldKeys;
    },
  },

  methods: {
    reset() {
      this.freeTextSearch = null;
      this.filters = {};
      this.$refs.form.reset();
      bus.publish('filters.reset', {})
      this.search();
    },

    search() {
      if (this.$refs.form.validate()) {
        let value = this.filters;
        if (this.freeTextSearch) {
          value['-text'] = this.freeTextSearch;
        } else if (value['-text'] !== undefined) {
          delete(value['-text']);
        }
        this.filterPanelValue = null;
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
  },
}
</script>
