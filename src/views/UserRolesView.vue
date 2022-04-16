<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <entity-view
      ref="viewer"
      :repository="require('../services/repositories/userRoles').userRoles"
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
  name: 'UserRolesView',
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
