<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading || submitting"
  >

    <settings-edit
      ref="editor"
      @loading="updateLoadingIndicator"
      @submitting="updateSubmittingIndicator"
    >
    </settings-edit>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import SettingsEdit from '../../components/base/SettingsEdit';
import MainLayout from '../../layouts/base/Main';

export default {
  name: 'SettingsPage',
  components: {
    MainLayout,
    SettingsEdit,
  },

  data: () => ({
    crumbs: [],
    actions: [],
    loading: true,
    submitting: false,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    },

    updateSubmittingIndicator(value) {
      this.submitting = value;
    }
  },

  mounted() {
    this.crumbs = this.$refs.editor.defaultCrumbs();
    this.actions = this.$refs.editor.defaultActions();
  },
};
</script>
