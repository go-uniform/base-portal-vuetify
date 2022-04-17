<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <!-- provide key to ensure component is refreshed when navigating to a new path -->
    <entity-edit
      :key="$route.path"
      ref="editor"
      :repository="$route.meta.repository"
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
  name: 'EntityEditPage',
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
