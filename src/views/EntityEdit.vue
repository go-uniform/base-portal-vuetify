<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading || submitting"
  >

    <entity-edit
      ref="editor"
      :repository="$route.meta.repository"
      :id="$route.params.id"
      @loading="updateLoadingIndicator"
      @submitting="updateSubmittingIndicator"
    >
    </entity-edit>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityEdit from '../components/EntityEdit';
import MainLayout from '../layouts/Main';

export default {
  name: 'EntityEditPage',
  components: {
    MainLayout,
    EntityEdit,
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
