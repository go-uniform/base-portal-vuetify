<template>

  <div>
    <v-btn
      class="mb-8 hidden-md-and-up"
      color="success"
      :to="this.repository.addPage"
      block
      large
    >
      <v-icon
        class="mr-2"
      >
        mdi-plus-box
      </v-icon>
      {{ format('New') }}
    </v-btn>

    <slot
      name="filters"
      v-if="repository.filters && repository.filters.length > 0 || repository.freeTextSearch"
    >
      <v-expansion-panels
        :value="0"
        class="justify-start mb-8"
      >
        <v-expansion-panel>
          <v-expansion-panel-header
            color="primary white--text"
          >
            <strong>
              {{ format('Filters') }}
            </strong>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-if="repository.freeTextSearch"
                >
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
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
                  {{ format('Reset') }}
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
                  {{ format('Search') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </slot>

    <v-data-table
      :show-select="showSelect"
      :items="records"
      :headers="headers"
      mobile-breakpoint="sm"
      v-model="selectedIds"
    >
      <template
        v-for="(column, index) in columns()"
        v-slot:[column]="{header, item}"
      >

        <slot
          v-if="isLink(header)"
          :set="field = repository.fields[header.value]"
          :name="column"
          :item="item"
          :header="header"
        >
          <a
            :key="index"
            :href="`${field.linkRepository.viewPagePrefix}/${item.id}`"
          >
            {{ item[field.linkLabelFieldKey] }}
          </a>
        </slot>
        <slot
          v-else-if="column !== 'item.actions'"
          :name="column"
          :item="item"
          :header="header"
        >
          <div
            :key="index"
          >
            {{ doFormat(header, item) }}
          </div>
        </slot>
        <slot
          v-else-if="column === 'item.actions'"
        >
          <div
            v-if="!$vuetify.breakpoint.mobile"
            :key="index"
          >
            <slot
              name="actions.wrapper"
              :item="item"
            >
              <v-menu>
                <template
                  v-slot:activator="{ on, attrs }"
                >
                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <slot
                      name="actions"
                      :item="item"
                    >
                    </slot>
                    <slot
                      name="actions.delete"
                      :item="item"
                    >
                      <v-btn
                        class="ma-2"
                        color="error"
                        @click="remove(item)"
                        :block="$vuetify.breakpoint.mobile"
                        :large="$vuetify.breakpoint.mobile"
                      >
                        <v-icon
                          class="mr-2"
                        >
                          mdi-delete
                        </v-icon>
                        {{ format('Delete') }}
                      </v-btn>
                    </slot>
                    <slot
                      name="actions.edit"
                      :item="item"
                    >
                      <v-btn
                        class="ma-2"
                        color="warning"
                        @click="edit(item)"
                        :block="$vuetify.breakpoint.mobile"
                        :large="$vuetify.breakpoint.mobile"
                      >
                        <v-icon
                          class="mr-2"
                        >
                          mdi-pencil
                        </v-icon>
                        {{ format('Edit') }}
                      </v-btn>
                    </slot>
                    <slot
                      name="actions.view"
                      :item="item"
                    >
                      <v-btn
                        class="ma-2"
                        color="info"
                        @click="view(item)"
                        :block="$vuetify.breakpoint.mobile"
                        :large="$vuetify.breakpoint.mobile"
                      >
                        <v-icon
                          class="mr-2"
                        >
                          mdi-eye
                        </v-icon>
                        {{ format('View') }}
                      </v-btn>
                    </slot>
                  </v-list-item>
                </v-list>
              </v-menu>
            </slot>
          </div>
          <div
            v-else
            :key="index"
            class="pr-4"
            >
            <slot
              name="actions"
              :item="item"
            >
            </slot>
            <slot
              name="actions.delete"
              :item="item"
            >
              <v-btn
                class="ma-2"
                color="error"
                @click="remove(item)"
                :block="$vuetify.breakpoint.mobile"
                :large="$vuetify.breakpoint.mobile"
              >
                <v-icon
                  class="mr-2"
                >
                  mdi-delete
                </v-icon>
                {{ format('Delete') }}
              </v-btn>
            </slot>
            <slot
              name="actions.edit"
              :item="item"
            >
              <v-btn
                class="ma-2"
                color="warning"
                @click="edit(item)"
                :block="$vuetify.breakpoint.mobile"
                :large="$vuetify.breakpoint.mobile"
              >
                <v-icon
                  class="mr-2"
                >
                  mdi-pencil
                </v-icon>
                {{ format('Edit') }}
              </v-btn>
            </slot>
            <slot
              name="actions.view"
              :item="item"
            >
              <v-btn
                class="ma-2"
                color="info"
                @click="view(item)"
                :block="$vuetify.breakpoint.mobile"
                :large="$vuetify.breakpoint.mobile"
              >
                <v-icon
                  class="mr-2"
                >
                  mdi-eye
                </v-icon>
                {{ format('View') }}
              </v-btn>
            </slot>
          </div>
        </slot>
      </template>
    </v-data-table>
  </div>

</template>

<style lang="scss">
.v-data-table__mobile-row {
  flex-direction: column !important;
  align-items: start !important;
  margin-top: 20px !important;
}
.v-data-table__mobile-row__cell {
  text-align: left !important;
  width:100%;
}
</style>

<script>
import {confirmation, deleteConfirmation, format, formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';
import {baseTableHeaders} from '../services/base/base';
import {bus} from '../services/base/bus';

export default {
  name: 'entity-list',
  props: {
    disableSelection: Boolean,
    repository: null,
    hideHeaders: [],
    prefixHeaders: [],
    suffixHeaders: [],
  },
  data: () => ({
    records: [],
    headers: [],
    datePicker: false,
    dates: [],
  }),
  computed: {
    showSelect() {
      const bulkActions = this.repository.bulkActions;
      const hasBulkActions = bulkActions && bulkActions.length > 0;
      return !this.disableSelection && !this.$vuetify.breakpoint.mobile && hasBulkActions;
    },
    selectedIds: {
      // getter
      get: function () {
        return this.value;
      },
      // setter
      set: function (newValue) {
        this.value = newValue;
        this.$emit('input', this.value);
        bus.publish('list.selected', this.value);
      }
    }
  },
  methods: {
    reset() {
      // todo: reset filters
      alert('reset!');
    },
    search() {
      // todo: search filters
      alert('search!');
    },
    isLink(header) {
      const field = this.repository.fields[header.value];
      if (!field) {
        return false;
      }
      return field.type === 'linkId';
    },
    doFormat(header, item) {
      let value = item[header.value];
      const field = this.repository.fields[header.value];
      if (field) {
        const fieldType = field.type;
        switch (fieldType) {
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
      }
      return value;
    },
    columns() {
      return this.headers.map(x => {
        return 'item.' + x.value;
      });
    },
    load() {
      function prepend(array, values) {
        let newArray = array.slice();
        values.reverse().forEach((value) => {
          newArray.unshift(value);
        });
        return newArray;
      }

      this.headers = baseTableHeaders(this.repository);
      if (this.prefixHeaders) {
        this.headers = prepend(this.headers, this.prefixHeaders);
      }
      if (this.suffixHeaders) {
        this.suffixHeaders.forEach((header) => {
          this.headers.push(header);
        });
      }
      this.headers.push({
        text: 'Actions',
        value: 'actions',
        align: 'end',
        sortable: false,
      })

      if (this.hideHeaders) {
        this.headers = this.headers.filter(item => !this.hideHeaders.includes(item.value));
      }

      this.repository.list().then((response) => {
        this.records = response.items;
      })
    },
    remove(item) {
      deleteConfirmation((confirmed) => {
        if (confirmed) {
          this.repository.delete(item.id).then(() => {
            this.load();
          });
        }
      })
    },
    edit(item) {
      this.$router.push(`${this.repository.editPagePrefix}/${item.id}`);
    },
    view(item) {
      this.$router.push(`${this.repository.viewPagePrefix}/${item.id}`);
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
        },
      ];
    },

    defaultActions() {
      return [
        {
          icon: 'mdi-plus-box',
          color: 'success',
          title: format('New'),
          location: `${this.repository.addPage}`,
        },
      ];
    },

    defaultBulkActions() {
      return this.repository.bulkActions;
    },

    bulkActionHandler(action, items) {
      const ids = items.map((item) => {
        return item.id;
      });
      confirmation((confirmed) => {
        if (confirmed) {
          this.repository.bulk(action.key, ids).then(() => {
            this.load();
          });
        }
      }, 'Are you sure?', format('You are about to {0} {1} record(s), are you sure you want to do this?', action.title.toLowerCase(), ids.length), {
        color: action.color ?? 'info',
      })
    }
  },
  mounted() {
    this.load();
  },
};
</script>
