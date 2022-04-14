<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
  >

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
import {formatString} from '../plugins/vuetify';

export default {
  name: 'UsersEdit',
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
            title: formatString('Users'),
            location: '/users'
          },
          {
            title: formatString('View'),
            location: '/users/view/'+ this.$route.params.id,
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
          title: formatString('Users'),
          location: '/users'
        },
        {
          title: formatString('New'),
        },
      ];
    },

    actions: function() {
      let cancelUrl = '/users';
      if (this.$route.params.id) {
        cancelUrl = '/users/view/'+ this.$route.params.id;
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
