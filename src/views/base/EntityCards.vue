<template>

  <main-layout
    row
    no-padding
    align-start
  >

    <div
      class="flex-grow-1"
      v-for="(card, index) in cards"
      v-bind:key="`card-${index}`"
    >
      <v-card
        hover
      >
        <v-card-text>
          <v-img
            :src="card.thumbnail"
            :aspect-ratio="16/9"
          />
        </v-card-text>
        <v-card-title>
          {{ card.title }}
        </v-card-title>
        <v-card-subtitle
          v-if="card.description"
          v-html="card.description"
        />
      </v-card>
    </div>

  </main-layout>

</template>

<style lang="scss" scoped>
.flex-grow-1 {
  flex: 1 0 100%;
  border: 15px solid transparent;
}
@media (min-width: 960px) {
  .flex-grow-1 {
    flex: 1 0 50%;
    max-width: 50%;
  }
}
@media (min-width: 1264px) {
  .flex-grow-1 {
    flex: 1 0 33%;
    max-width: 33%;
  }
}
@media (min-width: 1904px) {
  .flex-grow-1 {
    flex: 1 0 25%;
    max-width: 25%;
  }
}
</style>

<script>
import MainLayout from '@/layouts/base/Main';

export default {
  name: 'EntityCards',
  components: {
    MainLayout
  },

  data: () => ({
    cards: [
      {
        thumbnail: 'https://via.placeholder.com/800x600',
        title: 'Survey Results',
        description: 'Test',
      },
    ],
  }),
};
</script>
