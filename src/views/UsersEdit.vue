<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <entity-edit
      ref="editor"
      :repository="require('../services/repositories/users').users"
      :id="$route.params.id"
    >
    </entity-edit>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityEdit from '../components/EntityEdit';
import MainLayout from '../layouts/Main';

export default {
  name: 'UsersEdit',
  components: {
    MainLayout,
    EntityEdit,
  },

  data: () => ({
    crumbs: [],
    actions: [],
  }),

  mounted() {
    this.crumbs = this.$refs.editor.defaultCrumbs();
    this.actions = this.$refs.editor.defaultActions();
  },
};
</script>
