<template>

  <main-layout>

    <entity-edit
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
};
</script>
