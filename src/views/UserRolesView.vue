<template>

  <main-layout>

    <entity-view
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
};
</script>
