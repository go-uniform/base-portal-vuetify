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
      :src="item.urlEdit"
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
import {defaultEditCrumbs} from '../../services/base/entity.helper.default-edit-crumbs';

export default {
  name: 'ReportEdit',
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
      return [
        {
          icon: 'mdi-eye',
          title: translate('$vuetify.entityView.view'),
          color: 'info',
          callback: () => {
            this.$router.push(`${translate(this.repository.viewPage,this.item.id)}`);
          },
        },
      ];
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

    edit(item) {
      this.$router.push(`${translate(this.repository.editPage,item.id)}`);
    },
  },

  mounted() {
    const id = this.$route.params.id;
    this.loading = true;
    this.$emit('loading', this.loading);

    this.crumbs = defaultEditCrumbs(this.repository, id);
    this.repository.read(id).then((response) => {
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
