<template>

  <main-layout
    :loading="loading"
  >

    <entity-cards
      ref="cards"
      :repository="$route.meta.repository"
      @loading="updateLoadingIndicator"
    ></entity-cards>

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';
import EntityCards from '../../components/base/EntityCards';

export default {
  name: 'EntityCardsPage',
  components: {
    EntityCards,
    MainLayout
  },

  data: () => ({
    loading: true,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    }
  },
};
</script>
