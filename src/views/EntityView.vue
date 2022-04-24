<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading"
  >

    <entity-view
      ref="viewer"
      :repository="$route.meta.repository"
      :id="$route.params.id"
      @loading="updateLoadingIndicator"
    >
    </entity-view>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityView from '../components/EntityView';
import MainLayout from '../layouts/Main';

export default {
  name: 'EntityViewPage',
  components: {
    MainLayout,
    EntityView,
  },

  data: () => ({
    crumbs: [],
    actions: [],
    loading: true,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    }
  },

  mounted() {
    this.crumbs = this.$refs.viewer.defaultCrumbs();
    this.actions = this.$refs.viewer.defaultActions();
  },
};
</script>
