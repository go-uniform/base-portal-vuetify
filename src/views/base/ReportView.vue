<template>

  <main-layout
    justify-center
  >

    <div>
      <!-- todo: architect report component -->
      <small><i>{{ translate('$vuetify.app.reportComingSoon') }}</i></small>
    </div>

  </main-layout>

</template>

<script>
import MainLayout from '@/layouts/base/Main';

export default {
  name: 'ReportView',
  components: {
    MainLayout
  },

  data: () => ({
  }),
};
</script>
