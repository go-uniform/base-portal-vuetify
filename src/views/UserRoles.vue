<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <entity-list
      ref="list"
      :repository="require('../services/repositories/userRoles').userRoles"
    >
    </entity-list>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityList from '../components/EntityList';
import MainLayout from '../layouts/Main';

export default {
  name: 'UserRoles',
  components: {
    MainLayout,
    EntityList,
  },

  data: () => ({
    crumbs: [],
    actions: [],
  }),

  mounted() {
    this.crumbs = this.$refs.list.defaultCrumbs();
    this.actions = this.$refs.list.defaultActions();
  },
};
</script>
