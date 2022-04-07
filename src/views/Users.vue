<template>

  <main-layout>

    <entity-list
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
};
</script>
