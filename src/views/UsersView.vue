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
import {__} from '../plugins/vuetify';

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
          title: __('Dashboard'),
          location: '/',
        },
        {
          title: __('Users'),
          location: '/users'
        },
        {
          title: __('View'),
        },
      ];
    },

    actions: function() {
      return [
        {
          icon: 'mdi-delete',
          color: 'error',
          title: __('Delete'),
          location: '/users/add',
        },
        {
          icon: 'mdi-pencil',
          color: 'warning',
          title: __('Edit'),
          location: '/users/edit/' + this.$route.params.id,
        },
      ];
    },
  },
};
</script>
