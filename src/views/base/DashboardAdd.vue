<template>

  <main-layout
    :actions="actions"
    :crumbs="crumbs"
    :loading="loading"
    no-padding
  >

    <v-layout
      v-if="loading"
      fill-height
      justify-center
      align-center
    >
      {{ translate('$vuetify.app.loading') }}
    </v-layout>
    <div
      v-else
    >
      todo: add creation form
    </div>

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';
import {dashboards} from '../../services/repositories/dashboards';
import {translate} from '../../plugins/base/vuetify';

export default {
  name: 'DashboardAdd',
  components: {
    MainLayout
  },

  computed: {
    crumbs() {
      return [
        {
          icon: translate('$vuetify.home.icon'),
          title: translate('$vuetify.home.pageTitle'),
          location: '/',
        },
        {
          title: 'New',
        },
      ]
    },
    actions() {
      return [
        {
          icon: 'mdi-view-list',
          title: translate('$vuetify.entityView.list'),
          color: 'info',
          callback: () => {
            this.$router.push(`/#${this.item.id}`);
          },
        },
      ];
    },
  },

  data: () => ({
    item: {},
    loading: false,
    repository: dashboards,
  }),

  methods: {
  },
};
</script>
