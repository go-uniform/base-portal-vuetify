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
      class="fill-content pb-2 no-border"
      :src="item.urlView"
      :hidden="loading"
      @load="updateLoadingIndicator(false)"
    />

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';
import {defaultViewCrumbs} from '../../services/base/entity.helper.default-view-crumbs';
import {defaultViewActions} from '../../services/base/entity.helper.default-view-actions';
import {deleteConfirmation, loadingStart, toastError, translate} from '../../plugins/base/vuetify';
import {reports} from '../../services/repositories/reports';

export default {
  name: 'ReportView',
  components: {
    MainLayout
  },

  data: () => ({
    crumbs: [],
    loading: true,
    item: {},
    repository: reports,
  }),

  computed: {
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
      this.$router.push(`${this.repository.editPagePrefix}/${this.item.id}`);
    },
  },

  mounted() {
    this.loading = true;
    this.$emit('loading', this.loading);

    this.crumbs = defaultViewCrumbs(this.repository);
    this.repository.read(this.$route.params.id).then((response) => {
      this.item = response.item;
      this.$forceUpdate();
    }).catch((reason) => {
      const message = reason.headers.get('Message') ?? translate('$vuetify.errors.general');
      const messageArguments = reason.headers.get('Message-Arguments') ?? '';
      toastError(message, ...messageArguments.split('###'));
    });
  },
};
</script>
