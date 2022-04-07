<template>

  <empty-layout>

    <p>
      You have been successfully logged out of the system. <a href="/login">Go back to login</a>
    </p>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'LogoutView',
  components: {EmptyLayout},
};
</script>
