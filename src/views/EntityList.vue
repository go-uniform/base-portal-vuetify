<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :bulkActions="bulkActions"
    :bulkActionHandler="bulkActionHandler"
  >

    <!-- provide key to ensure component is refreshed when navigating to a new path -->
    <entity-list
      :key="$route.path"
      ref="list"
      :repository="$route.meta.repository"
    >
    </entity-list>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityList from '../components/EntityList';
import MainLayout from '../layouts/Main';

export default {
  name: 'EntityListPage',
  components: {
    MainLayout,
    EntityList,
  },

  data: () => ({
    crumbs: [],
    actions: [],
    bulkActions: [],
    bulkActionHandler: null,
  }),

  mounted() {
    this.crumbs = this.$refs.list.defaultCrumbs();
    this.actions = this.$refs.list.defaultActions();
    this.bulkActions = this.$refs.list.defaultBulkActions();
    this.bulkActionHandler = this.$refs.list.bulkActionHandler;
  },
};
</script>
