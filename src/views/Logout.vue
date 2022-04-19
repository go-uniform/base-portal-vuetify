<template>

  <empty-layout>

    <div
      class="pa-8 text-center"
      v-html="translate('custom.logout.pageHtml')"
    >
    </div>
    <a href="/login">{{ translate('custom.app.backLogin') }}</a>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'LogoutView',
  components: {EmptyLayout},
};
</script>
