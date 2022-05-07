<template>

  <main-layout
    :actions="actions"
    :crumbs="crumbs"
    :loading="loading"
    no-padding
  >

    <template
      v-slot:header
    >
      <v-tabs
        v-if="!loading && records.length > 1"
        background-color="background"
        v-model="tab"
        show-arrows
        @change="change"
      >
        <v-tab
          v-for="record in records"
          :key="record.id"
          :href="`#${record.id}`"
        >
          {{ record.title }}
        </v-tab>
      </v-tabs>
    </template>
    <v-layout
      v-if="loading"
      fill-height
      justify-center
      align-center
    >
      {{ translate('$vuetify.app.loading') }}
    </v-layout>
    <v-tabs-items
      v-model="tab"
      v-else-if="records.length > 1"
    >
      <v-tab-item
        v-for="record in records"
        :key="record.id"
        :value="record.id"
        class="fill-content"
      >
        <div
          v-if="tab === record.id"
          class="fill-content"
        >
          <iframe
            v-if="record.urlView"
            class="fill-content pb-2 no-border"
            :src="record.urlView"
            :hidden="loading"
            @load="updateLoadingIndicator(false)"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
    <div
      class="fill-content"
      v-else
    >

      <iframe
        v-if="records.length === 1 && item.urlView"
        class="fill-content pb-2 no-border"
        :src="item.urlView"
        :hidden="loading"
        @load="updateLoadingIndicator(false)"
      />
      <v-layout
        class="fill-content"
        justify-center
        align-center
        column
        v-else-if="!repository.disableCreation"
      >

        <p>
          {{ translate('$vuetify.dashboards.noData') }}
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
          {{ translate('$vuetify.dashboards.noData') }}

        </v-btn>
      </v-layout>
    </div>

  </main-layout>

</template>

<style lang="scss" scoped>
.v-tab {
  max-width: 180px !important;
}

.v-window {
  width: 100% !important;
  height: 100% !important;
}
</style>

<script>
import MainLayout from '@/layouts/base/Main';
import {deleteConfirmation, loadingStart, loadingStop, translate} from '../../plugins/base/vuetify';
import {dashboards} from '../../services/repositories/dashboards';
import {defaultViewActions} from '../../services/base/entity.helper.default-view-actions';

export default {
  name: 'DashboardView',
  components: {
    MainLayout
  },

  computed: {
    crumbs() {
      if (this.loading) {
        return [
          {
            title: '$vuetify.app.loading',
          }
        ];
      }
      if (this.records && this.records.length === 0) {
        return [];
      }
      return [
        {
          title: this.item.title,
          hint: this.item.description,
        },
      ]
    },
    actions() {
      if (this.records && this.records.length === 0) {
        return [];
      }
      let editHandler = null;
      if (this.item.urlEdit) {
        editHandler = this.edit;
      }
      return defaultViewActions(this.remove, editHandler, null, this.repository.addPage);
    },
  },

  data: () => ({
    tab: null,
    records: [],
    item: null,
    loading: true,
    repository: dashboards,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    },

    load() {
      this.loading = true;
      this.$emit('loading', this.loading);

      this.repository.list().then((response) => {
        this.records = response.items;
        if (this.records && this.records.length > 0 && !this.item) {
          if (this.$route.hash) {
            this.item = this.records.find((item) => {
              return item.id === this.$route.hash.replace('#', '');
            });
            if (this.item) {
              this.tab = this.item.id;
            }
          }
          if (!this.item) {
            this.item = this.records[0];
          }
        }
        this.loading = false;
        this.$emit('loading', this.loading);
        loadingStop();
        this.$forceUpdate();
      }).finally(() => {
        this.loading = false;
        this.$emit('loading', this.loading);
      });
    },

    change(event) {
      const hash = `#${event}`;
      if (this.$route.hash !== hash) {
        this.$router.push(hash);
      }
      this.item = this.records.find((item) => {
        return item.id === event;
      });
    },

    remove() {
      deleteConfirmation((confirmed) => {
        if (confirmed) {
          loadingStart(7000, '$vuetify.app.deleting');
          this.repository.delete(this.item.id).then(() => {
            this.item = null;
            this.load();
          });
        }
      })
    },

    edit() {
      if (this.item) {
        this.$router.push(`${translate(this.repository.editPage,this.item.id)}`);
      }
    },
  },

  mounted() {
    this.load();
  },
};
</script>
