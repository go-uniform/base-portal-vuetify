<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading"
  >

    <entity-view
      ref="viewer"
      :repository="users"
      :id="me"
      @loading="updateLoadingIndicator"
      :custom-actions="customActions"
    >
    </entity-view>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import MainLayout from '../../layouts/base/Main';
import EntityView from "@/components/base/EntityView.vue";
import { users } from "@/services/repositories/users";
import { auth } from "@/services/base/auth";
import { translate } from "@/plugins/base/vuetify";

export default {
  name: 'AccountPage',

  computed: {
    users() {
      return users
    },
    me() {
      return auth.meta()['sub'];
    },
    customActions() {
      return [
        {
          icon: 'mdi-pencil',
          title: translate('$vuetify.entityView.edit'),
          color: 'warning',
          callback: (item) => {
            this.$router.push('/account/edit');
          },
        },
      ];
    }
  },

  components: {
    EntityView,
    MainLayout,
  },

  data: () => ({
    crumbs: [
      {
        icon: translate('$vuetify.home.icon'),
        title: translate('$vuetify.home.pageTitle'),
        location: '/',
      },
      {
        title: translate('$vuetify.account.pageTitle'),
      }
    ],
    actions: [],
    loading: true,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    }
  },
};
</script>
