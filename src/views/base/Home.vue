<template>

  <main-layout
    justify-center
  >

    <div>
      <!-- todo: architect widget component -->
      <small><i>dashboard widgets/metrics will go here</i></small>
    </div>

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';

export default {
  name: 'HomeView',
  components: {
    MainLayout
  },

  data: () => ({
  }),
};
</script>
