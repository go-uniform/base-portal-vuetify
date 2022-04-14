<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

    <entity-edit
      :repository="require('../services/repositories/userRoles').userRoles"
      :id="$route.params.id"
    >
    </entity-edit>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import EntityEdit from '../components/EntityEdit';
import MainLayout from '../layouts/Main';
import {formatString} from '../plugins/vuetify';

export default {
  name: 'UserRolesEdit',
  components: {
    MainLayout,
    EntityEdit,
  },

  computed: {
    crumbs: function() {
      if (this.$route.params.id) {
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
            location: '/user-roles/view/'+ this.$route.params.id,
          },
          {
            title: formatString('Edit'),
          },
        ];
      }
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
          title: formatString('New'),
        },
      ];
    },

    actions: function() {
      let cancelUrl = '/user-roles';
      if (this.$route.params.id) {
        cancelUrl = '/user-roles/view/'+ this.$route.params.id;
      }
      return [
        {
          icon: 'mdi-content-save',
          color: 'success',
          title: formatString('Save'),
          location: cancelUrl,
        },
        {
          icon: 'mdi-close-circle',
          color: 'grey',
          title: formatString('Cancel'),
          location: cancelUrl,
        },
      ];
    },
  },
};
</script>
