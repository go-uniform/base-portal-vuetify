<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading || submitting"
  >

    <entity-edit
      ref="editor"
      :repository="users"
      :id="me"
      @loading="updateLoadingIndicator"
      @submitting="updateSubmittingIndicator"
      view-page-redirect="/account/"
      list-page-redirect="/account/"
    >
    </entity-edit>

  </main-layout>

</template>

<script>
// @ is an alias to /src
import MainLayout from '../../layouts/base/Main';
import { users } from "@/services/repositories/users";
import { auth } from "@/services/base/auth";
import { translate } from "@/plugins/base/vuetify";
import EntityEdit from "@/components/base/EntityEdit.vue";

export default {
  name: 'AccountEditPage',

  computed: {
    users() {
      return users
    },
    me() {
      return auth.meta()['sub'];
    }
  },

  components: {
    EntityEdit,
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
        icon: translate('$vuetify.account.icon'),
        title: translate('$vuetify.account.pageTitle'),
        location: '/account',
      },
      {
        title: translate('$vuetify.accountEdit.pageTitle'),
      }
    ],
    actions: [],
    loading: true,
    submitting: false,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    },

    updateSubmittingIndicator(value) {
      this.submitting = value;
    }
  },
};
</script>
