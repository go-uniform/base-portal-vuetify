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
    <iframe
      class="fill-content pb-2 no-border"
      :src="item.urlEdit"
      :hidden="loading"
      @load="updateLoadingIndicator(false)"
    />

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';
import {dashboards} from '../../services/repositories/dashboards';
import {toastError, translate} from '../../plugins/base/vuetify';

export default {
  name: 'DashboardEdit',
  components: {
    MainLayout
  },

  computed: {
    crumbs() {
      return [
        {
          icon: translate('$vuetify.home.icon'),
          title: translate('$vuetify.home.pageTitle'),
          location: `/#${this.item.id}`,
        },
        {
          title: this.item.title ?? '$vuetify.app.loading',
          hint: this.item.description,
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
    loading: true,
    repository: dashboards,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    },
  },

  mounted() {
    this.loading = true;
    this.$emit('loading', this.loading);
    this.item.id = this.$route.params.id;
    this.repository.read(this.item.id).then((response) => {
      this.item = response.item;
      this.loading = false;
      this.$emit('loading', this.loading);
      this.$forceUpdate();
    }).catch((reason) => {
      const message = reason.headers.get('Message') ?? translate('$vuetify.errors.general');
      const messageArguments = reason.headers.get('Message-Arguments') ?? '';
      toastError(message, ...messageArguments.split('###'));
    });
  },

  created() {
    this.item.id = this.id;
  }
};
</script>
