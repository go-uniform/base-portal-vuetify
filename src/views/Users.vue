<template>
  <div class="userRoles">
    <List :repository="require('../services/repositories/users').users">
    </List>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '../components/List';

export default {
  name: 'Users',
  components: {
    List,
  },
};
</script>
