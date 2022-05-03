<template>

  <main-layout
    row
    no-padding
  >

    <div
      class="flex-grow-1"
      v-for="(report, index) in reports"
      v-bind:key="`report-${index}`"
    >
      <v-card
        hover
      >
        <v-card-text>
          <v-img
            src="https://via.placeholder.com/640x360"
            :aspect-ratio="16/9"
          />
        </v-card-text>
        <v-card-title>
          {{ report.title }}
        </v-card-title>
        <v-card-subtitle
          v-html="report.description"
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
  name: 'ReportView',
  components: {
    MainLayout
  },

  data: () => ({
    reports: [
      {
        thumbnailUrl: 'https://via.placeholder.com/800x600',
        title: 'Survey Results',
        description: '',
      },
      {
        title: 'Report #2',
        description: 'Testing<br>test<br>res',
      },
      {
        title: 'Report #3',
      },
      {
        title: 'Report #4',
      },
      {
        title: 'Report #5',
      },
      {
        title: 'Report #6',
      },
      {
        title: 'Report #7',
      },
      {
        title: 'Report #8',
      },
      {
        title: 'Report #9',
      },
      {
        title: 'Report #10',
      },
      {
        title: 'Report #11',
      },
      {
        title: 'Report #12',
      },
      {
        title: 'Report #13',
      },
    ],
  }),
};
</script>
