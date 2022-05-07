<template>

  <main-layout
    :crumbs="crumbs"
    :actions="actions"
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
    crumbs: [],
    actions: [],
    bulkActions: [],
    bulkActionHandler: null,
    loading: true,
  }),

  methods: {
    updateLoadingIndicator(value) {
      this.loading = value;
    }
  },

  mounted() {
    this.crumbs = this.$refs.cards.defaultCrumbs();
    this.actions = this.$refs.cards.defaultActions();
    this.bulkActions = this.$refs.cards.defaultBulkActions();
    this.bulkActionHandler = this.$refs.cards.bulkActionHandler;
  },
};
</script>
