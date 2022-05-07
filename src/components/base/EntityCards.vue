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
    v-else-if="!records || records.length === 0"
    class="fill-content"
    justify-center
    align-center
    column
  >

    <p>
      {{ translate('$vuetify.app.noData') }}
    </p>
    <v-btn
      color="success"
      :to="repository.addPage"
    >

      <v-icon
        class="mr-2"
      >
        mdi-plus-box
      </v-icon>
      {{ translate('$vuetify.entityCards.new') }}

    </v-btn>

  </v-layout>
  <div
    v-else
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
      {{ translate('$vuetify.entityCards.new') }}

    </v-btn>
    <slot
      name="filters"
    >
      <entity-list-filters
        :repository="repository"
        v-model="filters"
        @change="load()"
        :disabled="loading"
      />
    </slot>
    <v-layout
      wrap
      align-start
      justify-start
    >
      <div
        class="card-container"
        v-for="(record, index) in records"
        v-bind:key="index"
      >
        <v-card
          hover
          @click="view(record)"
        >
          <v-card-text>
            <v-img
              :src="record.urlThumbnail"
              :aspect-ratio="16/9"
            />
          </v-card-text>
          <v-card-title>
            {{ record.title }}
          </v-card-title>
          <v-card-subtitle
            v-html="record.description"
          />
        </v-card>
      </div>
    </v-layout>
    <v-btn
      v-if="hasMore"
      class="mt-8 mb-2 mb-sm-4 mb-lg-8"
      color="primary"
      text
      block
      large
    >

      <v-icon
        class="mr-2"
      >
        mdi-load
      </v-icon>
      {{ translate('$vuetify.entityCards.load') }}

    </v-btn>

  </div>

</template>

<style lang="scss" scoped>
.card-container {
  border: 1px solid transparent;
  flex: 1 0 100%;
  max-width: 100%;

  .v-card {
    border-radius: 0 !important;
    opacity: 80%;
  }

  .v-card__subtitle {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    min-height: 42px;
  }
}

.card-container:hover {
  border-color: var(--v-accent-base);

  .v-card {
    opacity: 100%;
  }
}

@media (min-width: 960px) {
  .card-container {
    flex: 1 0 50%;
    max-width: 50%;

    .v-card-subtitle {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 42px;
    }
  }
}

@media (min-width: 1264px) {
  .card-container {
    flex: 1 0 33%;
    max-width: 33%;

    .v-card-subtitle {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 42px;
    }
  }
}

@media (min-width: 1904px) {
  .card-container {
    flex: 1 0 25%;
    max-width: 25%;

    .v-card-subtitle {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 42px;
    }
  }
}
</style>

<script>
import {confirmation, deleteConfirmation, loadingStart, loadingStop, translate} from '../../plugins/base/vuetify';
import EntityListFilters from './EntityListFilters';
import {defaultListCrumbs} from '../../services/base/entity.helper.default-list-crumbs';
import {defaultListActions} from '../../services/base/entity.helper.default-list-actions';
import {defaultListItemActions} from '../../services/base/entity.helper.default-list-item-actions';

export default {
  name: 'entity-cards',
  components: {EntityListFilters},

  props: {
    repository: null,
  },

  data: () => ({
    records: [],
    sortBy: null,
    sortDesc: null,
    page: 1,
    pageSize: 15,
    filters: {},
    loading: true,
    hasMore: false,
  }),

  methods: {
    load() {
      this.loading = true;
      this.$emit('loading', this.loading);

      let order = null;
      if (this.sortBy) {
        order = `${this.sortDesc ? '-' : ''}${this.sortBy}`;
      }

      this.repository.list(order, this.filters, this.page, this.pageSize).then((response) => {
        this.records = response.items;
      }).finally(() => {
        this.loading = false;
        this.$emit('loading', this.loading);
      });
    },

    remove(item) {
      deleteConfirmation((confirmed) => {
        if (confirmed) {
          loadingStart(7000, '$vuetify.app.deleting');
          this.repository.delete(item.id).then(() => {
            this.load();
            loadingStop();
          });
        }
      })
    },

    edit(item) {
      this.$router.push(`${translate(this.repository.editPage, item.id)}`);
    },

    view(item) {
      this.$router.push(`${translate(this.repository.viewPage, item.id)}`);
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
        }, '$vuetify.entityCards.bulkActionConfirmationTitle',
        translate('$vuetify.entityCards.bulkActionConfirmationMessage',
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
