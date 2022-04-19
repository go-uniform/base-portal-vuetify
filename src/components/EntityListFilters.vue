<template>

  <v-expansion-panels
    v-if="repository.filters && repository.filters.length > 0 || repository.freeTextSearch"
    class="justify-start mb-8"
    v-model="filterPanelValue"
  >

    <v-expansion-panel>

      <v-expansion-panel-header
        color="primary white--text"
      >
        <strong
          class="text-uppercase"
        >
          {{ translate('base.entityFilters.title') }}
        </strong>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form
          ref="search"
        >

          <v-row
            class="pt-8 pb-0"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-if="repository.freeTextSearch"
                v-model="freeTextSearch"
                label="Search Terms"
                filled
              >
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template
                  v-slot:activator="{ on, attrs }"
                >
                  <v-text-field
                    :value="dates.join(' - ')"
                    label="Created At"
                    readonly
                    clearable
                    filled
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="dates = null"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  range
                >
                </v-date-picker>
              </v-menu>
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
                {{ translate('Reset') }}
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
                {{ translate('Search') }}
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>
<script>
export default {
  name: 'entity-list-filters',
  props: {
    repository: null,
    value: null,
  },

  data: () => ({
    datePicker: false,
    freeTextSearch: null,
    dates: [],
    filterPanelValue: null,
  }),

  watch: {
    filterPanelValue: function() {
      // check if filter panel is closed
      if (!this.filterPanelValue) {
        this.search();
      }
    }
  },

  methods: {
    reset() {
      this.freeTextSearch = null;
      this.dates = [];
    },

    search() {
      let value = {};
      if (this.freeTextSearch) {
        value["-text"] = this.freeTextSearch;
      }
      if (this.dates) {
        value["created-at>"] = this.dates[0];
        value["created-at<"] = this.dates[1];
      }
      this.filterPanelValue = null;
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
}
</script>
