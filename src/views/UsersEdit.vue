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
import {format} from '../plugins/vuetify';

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
            title: format('Home'),
            location: '/',
          },
          {
            title: format('Users'),
            location: '/users'
          },
          {
            title: format('View'),
            location: '/users/view/'+ this.$route.params.id,
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
          title: format('Users'),
          location: '/users'
        },
        {
          title: format('New'),
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
