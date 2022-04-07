<template>

  <main-layout>

    <entity-view
      :repository="require('../services/repositories/users').users"
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
  name: 'UsersView',
  components: {
    MainLayout,
    EntityView,
  },
};
</script>
