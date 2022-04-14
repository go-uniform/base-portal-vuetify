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
import {format} from '../plugins/vuetify';

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
            title: format('Home'),
            location: '/',
          },
          {
            title: format('User Roles'),
            location: '/user-roles'
          },
          {
            title: format('View'),
            location: '/user-roles/view/'+ this.$route.params.id,
          },
          {
            title: format('Edit'),
          },
        ];
      }
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
          title: format('New'),
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
          title: format('Save'),
          location: cancelUrl,
        },
        {
          icon: 'mdi-close-circle',
          class: 'white--text',
          color: 'grey',
          title: format('Cancel'),
          location: cancelUrl,
        },
      ];
    },
  },
};
</script>
