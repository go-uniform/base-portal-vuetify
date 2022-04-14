<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

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
import {format} from '../plugins/vuetify';

export default {
  name: 'UsersView',
  components: {
    MainLayout,
    EntityView,
  },

  computed: {
    crumbs: function() {
      return [
        {
          icon: 'mdi-home',
          title: format('Home'),
          location: '/',
        },
        {
          title: format('Users'),
          location: '/users'
        },
        {
          title: format('View'),
        },
      ];
    },

    actions: function() {
      return [
        {
          icon: 'mdi-delete',
          color: 'error',
          title: format('Delete'),
          location: '/users/add',
        },
        {
          icon: 'mdi-pencil',
          color: 'warning',
          title: format('Edit'),
          location: '/users/edit/' + this.$route.params.id,
        },
        {
          icon: 'mdi-view-list',
          color: 'info',
          title: format('List'),
          location: `/users`,
        },
      ];
    },
  },
};
</script>
