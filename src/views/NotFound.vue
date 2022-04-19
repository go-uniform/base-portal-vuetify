<template>

  <empty-layout>

    <div
      class="pa-8 text-center"
      v-html="translate('custom.notFound.pageHtml')"
    >
    </div>
    <a href="/">{{ translate('custom.app.backSafety') }}</a>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'NotFound',
  components: {EmptyLayout},
};
</script>
