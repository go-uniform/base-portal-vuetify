<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

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
import {format} from '../plugins/vuetify';

export default {
  name: 'UserRolesView',
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
          title: format('User Roles'),
          location: '/user-roles'
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
          location: '/user-roles',
        },
        {
          icon: 'mdi-pencil',
          color: 'warning',
          title: format('Edit'),
          location: '/user-roles/edit/' + this.$route.params.id,
        },
        {
          icon: 'mdi-view-list',
          color: 'info',
          title: format('List'),
          location: `/user-roles`,
        },
      ];
    },
  },
};
</script>
