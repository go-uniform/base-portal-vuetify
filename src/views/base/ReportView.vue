<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
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
      v-if="item.urlView"
      class="fill-content pb-2 no-border"
      :src="item.urlView"
      :hidden="loading"
      @load="updateLoadingIndicator(false)"
    />

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';
import {defaultViewActions} from '../../services/base/entity.helper.default-view-actions';
import {deleteConfirmation, loadingStart, toastError, translate} from '../../plugins/base/vuetify';
import {reports} from '../../services/repositories/reports';

export default {
  name: 'ReportView',
  components: {
    MainLayout
  },

  data: () => ({
    loading: true,
    item: {},
    repository: reports,
  }),

  computed: {
    crumbs() {
      return [
        {
          icon: translate('$vuetify.home.icon'),
          title: translate('$vuetify.home.pageTitle'),
          location: '/',
        },
        {
          title: translate(this.repository.title.plural),
          location: this.repository.listPage,
        },
        {
          title: this.item.title,
          hint: this.item.description,
        },
      ];
    },
    actions() {
      let editHandler = null;
      if (this.item.urlEdit) {
        editHandler = this.edit;
      }
      return defaultViewActions(this.remove, editHandler, this.list);
    },
  },

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    },

    list() {
      this.$router.push(`${this.repository.listPage}`);
    },

    remove() {
      deleteConfirmation((confirmed) => {
        if (confirmed) {
          loadingStart(7000, '$vuetify.app.deleting');
          this.repository.delete(this.item.id).then(() => {
            this.$router.push(`${this.repository.listPage}`);
          });
        }
      })
    },

    edit() {
      this.$router.push(`${translate(this.repository.editPage,this.item.id)}`);
    },
  },

  mounted() {
    this.loading = true;
    this.$emit('loading', this.loading);
    this.repository.read(this.$route.params.id).then((response) => {
      this.item = response.item;
      if (!this.item.urlView) {
        this.loading = false;
      }
      this.$forceUpdate();
    }).catch((reason) => {
      const message = reason.headers.get('Message') ?? translate('$vuetify.errors.general');
      const messageArguments = reason.headers.get('Message-Arguments') ?? '';
      toastError(message, ...messageArguments.split('###'));
    });
  },
};
</script>
