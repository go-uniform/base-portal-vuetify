<template>

  <empty-layout>

    <div
      class="pa-2 pa-sm-4 pa-lg-8 text-center"
      v-html="translate('$vuetify.notFound.pageHtml')"
    >
    </div>
    <a href="/">{{ translate('$vuetify.app.backSafety') }}</a>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../../layouts/base/Empty';

export default {
  name: 'NotFound',
  components: {EmptyLayout},
};
</script>
