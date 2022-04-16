<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :bulk-actions="bulkActions"
    :bulk-action-handler="bulkActionHandler"
  >

    <entity-list
      ref="list"
      :repository="require('../services/repositories/users').users"
    >
    </entity-list>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityList from '../components/EntityList';
import MainLayout from '../layouts/Main';

export default {
  name: 'UsersView',
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
