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
import {__} from '../plugins/vuetify';

export default {
  name: 'UsersEdit',
  components: {
    MainLayout,
    EntityEdit,
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
          location: '/users/view/'+ this.$route.params.id,
        },
        {
          title: __('Edit'),
        },
      ];
    },

    actions: function() {
      return [
        {
          icon: 'mdi-content-save',
          color: 'success',
          title: __('Save'),
          location: '',
        },
        {
          icon: 'mdi-close-circle',
          color: 'grey',
          title: __('Cancel'),
          location: '/users/view/'+ this.$route.params.id,
        },
      ];
    },
  },
};
</script>
