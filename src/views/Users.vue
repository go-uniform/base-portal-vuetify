<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

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

  data: () => ({
    crumbs: [
      {
        icon: 'mdi-home',
        title: 'Dashboard',
        location: '/',
      },
      {
        title: 'Users',
      },
    ],

    actions: [
      {
        icon: 'mdi-plus-box',
        color: 'success',
        title: 'New',
        location: '/users/add',
      },
    ],
  }),
};
</script>
