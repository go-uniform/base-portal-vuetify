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
import {formatString} from '../plugins/vuetify';

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
          title: formatString('Dashboard'),
          location: '/',
        },
        {
          title: formatString('User Roles'),
          location: '/user-roles'
        },
        {
          title: formatString('View'),
        },
      ];
    },

    actions: function() {
      return [
        {
          icon: 'mdi-delete',
          color: 'error',
          title: formatString('Delete'),
          location: '/user-roles',
        },
        {
          icon: 'mdi-pencil',
          color: 'warning',
          title: formatString('Edit'),
          location: '/user-roles/edit/' + this.$route.params.id,
        },
        {
          icon: 'mdi-view-list',
          color: 'info',
          title: formatString('List'),
          location: `/user-roles`,
        },
      ];
    },
  },
};
</script>
