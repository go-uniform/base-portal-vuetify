<template>

  <div
    class="fill-width"
  >

    <v-btn
      class="mb-2 mb-sm-4 mb-lg-8 hidden-md-and-up"
      color="success"
      :to="this.repository.addPage"
      block
      large
      v-if="!this.repository.disableCreation"
    >

      <v-icon
        class="mr-2"
      >
        mdi-plus-box
      </v-icon>
      {{ translate('base.entityList.new') }}

    </v-btn>
    <slot
      name="filters"
    >
      <entity-list-filters
        :repository="repository"
        v-model="filters"
        @change="load()"
      />
    </slot>
    <v-data-table
      :show-select="showSelect"
      :items="records"
      :headers="headers"
      mobile-breakpoint="sm"
      v-model="selectedIds"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :page.sync="page"
      :items-per-page.sync="pageSize"
      @update:sort-by="load"
      @update:sort-desc="load"
      @update:items-per-page="load"
    >
      <template
        v-for="(column, index) in columns()"
        v-slot:[column]="{header, item}"
      >

        <slot
          v-if="column === 'item.actions'"
        >
          <div
            v-if="!$vuetify.breakpoint.mobile"
            :key="index"
          >
            <slot
              name="actions.wrapper"
              :item="item"
            >
              <button-menu
                icon="mdi-dots-vertical"
                :actions="actions"
                :item="item"
              />
            </slot>
          </div>
          <div
            v-else
            :key="index"
            class="pr-4"
          >
            <div
              v-for="(action, actionIndex) in actions"
              v-bind:key="actionIndex"
            >
              <slot
                :name="action.name"
                :item="item"
              >
                <v-btn
                  class="ma-2"
                  :color="action.color"
                  @click="action.callback(item)"
                  :block="$vuetify.breakpoint.mobile"
                  :large="$vuetify.breakpoint.mobile"
                >
                  <v-icon
                    class="mr-2"
                    v-if="action.icon"
                  >
                    {{ action.icon }}
                  </v-icon>
                  {{ translate(action.title) }}
                </v-btn>
              </slot>
            </div>
          </div>
        </slot>
        <slot
          v-else
          :set="field = repository.fields[header.value]"
          :name="column"
          :item="item"
          :header="header"
        >

          <entity-field-column-view
            :parent-repository="repository"
            :field="field"
            :field-key="header.value"
            :value="item[header.value]"
            :item="item"
          />
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
import {confirmation, deleteConfirmation, translate} from '../plugins/vuetify';
import {baseTableHeaders} from '../services/base/base';
import {bus} from '../services/base/bus';
import EntityListFilters from './EntityListFilters';
import EntityFieldColumnView from './EntityFieldColumnView';
import {defaultListCrumbs} from '../services/base/entity.helper.default-list-crumbs';
import {defaultListActions} from '../services/base/entity.helper.default-list-actions';
import {defaultListItemActions} from '../services/base/entity.helper.default-list-item-actions';
import ButtonMenu from './ButtonMenu';
import {prepend} from '../services/base/helper.prepend';

export default {
  name: 'entity-list',
  components: {ButtonMenu, EntityFieldColumnView, EntityListFilters},

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
    sortBy: null,
    sortDesc: null,
    page: 1,
    pageSize: 15,
    filters: {},
  }),

  computed: {
    showSelect() {
      let hasBulkActions = false;
      if (this.repository) {
        const bulkActions = this.repository.bulkActions;
        hasBulkActions = bulkActions && bulkActions.length > 0;
      }
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
    },

    actions() {
      return defaultListItemActions(this.repository, this.remove, this.edit, this.view);
    },
  },
  methods: {
    columns() {
      return this.headers.map(x => {
        return 'item.' + x.value;
      });
    },

    load() {
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
        text: translate('base.entityList.actions'),
        value: 'actions',
        align: 'end',
        sortable: false,
      })

      if (this.hideHeaders) {
        this.headers = this.headers.filter(item => !this.hideHeaders.includes(item.value));
      }

      let order = null;
      if (this.sortBy) {
        order = `${this.sortDesc ? '-' : ''}${this.sortBy}`;
      }

      this.repository.list(order, this.filters, this.page, this.pageSize).then((response) => {
        this.records = response.items;
      });
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

    defaultItemActions(item) {
      return defaultListItemActions(this.repository, item);
    },

    defaultCrumbs() {
      return defaultListCrumbs(this.repository);
    },

    defaultActions() {
      return defaultListActions(this.repository);
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
      }, 'base.entityList.bulkActionConfirmationTitle',
        translate('base.entityList.bulkActionConfirmationMessage',
        translate(action.title).toLowerCase(), ids.length), {
        color: action.color ?? 'info',
      });
    }
  },
  mounted() {
    this.load();
  },
};
</script>
