<template>

  <empty-layout>

    <div
      class="pa-8 text-center"
      v-html="translate('base.logout.pageHtml')"
    >
    </div>
    <a href="/login">{{ translate('base.app.backLogin') }}</a>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'LogoutView',
  components: {EmptyLayout},
};
</script>
