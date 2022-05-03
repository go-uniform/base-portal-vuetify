<template>

  <main-layout
    :actions="actions"
    :crumbs="crumbs"
    no-padding
  >

    <template
      v-slot:header
      v-if="dashboards.length > 1"
    >
      <v-tabs
        background-color="background"
        v-model="tab"
        show-arrows
        @change="change"
      >
        <v-tab
          v-for="dashboard in dashboards"
          :key="dashboard.value"
          :href="`#${dashboard.value}`"
        >
          {{ dashboard.title }}
        </v-tab>
      </v-tabs>
    </template>

    <v-tabs-items
      v-model="tab"
      v-if="dashboards.length > 1"
    >
      <v-tab-item
        v-for="dashboard in dashboards"
        :key="dashboard.value"
        :value="dashboard.value"
        class="fill-content"
      >
        <iframe
          class="fill-content pb-2 no-border"
        />
      </v-tab-item>
    </v-tabs-items>
    <div
      class="fill-content"
      v-else
    >
      <iframe
        v-if="dashboards.length === 1"
        class="fill-content pb-2 no-border"
      />
      <v-layout
        class="fill-content"
        justify-center
        align-center
        column
        v-else
      >

        <p>
          <small>
            <i>
              You have no dashboards, why not create your first dashboard now.
            </i>
          </small>
        </p>
        <v-btn
          color="success"
          class="mr-2"
        >

          <v-icon>
            mdi-plus-box
          </v-icon>
          New

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
import {translate} from '../../plugins/base/vuetify';

export default {
  name: 'EntityTabs',
  components: {
    MainLayout
  },

  computed: {
    crumbs() {
      if (this.dashboards || this.dashboards.length === 0) {
        return [];
      }
      return [
        {
          title: this.title,
          hint: this.hint,
        },
      ]
    },
    actions() {
      if (this.dashboards || this.dashboards.length === 0) {
        return [];
      }
      return [
        {
          icon: 'mdi-plus-box',
          color: 'success',
          title: translate('$vuetify.entityList.new'),
          callback: () => {
            alert('new');
          },
        },
        {
          icon: 'mdi-pencil',
          title: translate('$vuetify.entityList.edit'),
          color: 'warning',
          callback: () => {
            alert('edit');
          },
        },
      ]
    },
  },

  data: () => ({
    tab: null,
    title: null,
    hint: null,
    dashboards: [
      {
        value: 'dashboard-1',
        title: 'Dashboard #1',
        description: 'Description',
      },
      // {
      //   value: 'dashboard-2',
      //   title: 'Dashboard #2',
      // },
      // {
      //   value: 'dashboard-3',
      //   title: 'Dashboard #3',
      // },
      // {
      //   value: 'dashboard-4',
      //   title: 'Dashboard #4',
      // },
    ],
  }),

  methods: {
    change(event) {
      const dashboard = this.dashboards.find((item) => {
        return item.value === event;
      })
      if (dashboard) {
        this.title = dashboard.title;
        this.hint = dashboard.description;
      }
    },

  },

  mounted() {
    this.title = null;
    this.hint = null;
    if (this.dashboards.length > 0) {
      this.title = this.dashboards[0].title;
      this.hint = this.dashboards[0].description;
    }
  },
};
</script>
