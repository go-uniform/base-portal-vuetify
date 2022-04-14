<template>

  <empty-layout>

    <p
      class="pa-8 text-center"
    >
      The page you are looking for can't be found. <a href="/">Go back to safety</a>
    </p>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'NotFound',
  components: {EmptyLayout},
};
</script>
