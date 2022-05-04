<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
    :loading="loading"
  >

    my account view goes here!

  </main-layout>

</template>

<script>
// @ is an alias to /src
import MainLayout from '../../layouts/base/Main';

export default {
  name: 'AccountPage',
  components: {
    MainLayout,
  },

  data: () => ({
    crumbs: [],
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
