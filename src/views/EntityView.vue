<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <!-- provide key to ensure component is refreshed when navigating to a new path -->
    <entity-view
      :key="$route.path"
      ref="viewer"
      :repository="$route.meta.repository"
      :id="$route.params.id"
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
  }),

  mounted() {
    this.crumbs = this.$refs.viewer.defaultCrumbs();
    this.actions = this.$refs.viewer.defaultActions();
  },
};
</script>
