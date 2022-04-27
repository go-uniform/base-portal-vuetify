<template>

  <empty-layout>

    <div
      class="pa-2 pa-sm-4 pa-lg-8 text-center"
      v-html="translate('$vuetify.logout.pageHtml')"
    >
    </div>
    <a href="/login">{{ translate('$vuetify.app.backLogin') }}</a>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../../layouts/base/Empty';

export default {
  name: 'LogoutView',
  components: {EmptyLayout},
};
</script>
