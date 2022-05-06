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
import {translate} from '../../plugins/base/vuetify';
import {reports} from '../../services/repositories/reports';

export default {
  name: 'ReportsAdd',
  components: {
    MainLayout
  },

  computed: {
    crumbs() {
      return [
        {
          icon: translate('$vuetify.home.icon'),
          title: translate('$vuetify.home.pageTitle'),
          location: '/'
        },
        {
          title: translate(`$vuetify.${this.repository.entity}.plural`),
          location: `${this.repository.listPage}`,
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
            this.$router.push(`${this.repository.listPage}`);
          },
        },
      ];
    },
  },

  data: () => ({
    item: {},
    loading: false,
    repository: reports,
  }),

  methods: {
  },
};
</script>
