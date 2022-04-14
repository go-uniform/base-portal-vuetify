<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <entity-list
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
    crumbs: [
      {
        icon: 'mdi-home',
        title: 'Home',
        location: '/',
      },
      {
        title: 'User Roles',
      },
    ],

    actions: [
      {
        icon: 'mdi-plus-box',
        color: 'success',
        title: 'New',
        location: '/user-roles/add',
      },
    ],
  }),
};
</script>
