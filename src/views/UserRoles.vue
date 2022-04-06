<template>
  <div class="users">
    <List :repository="require('../services/repositories/userRoles').userRoles">
    </List>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '../components/List';

export default {
  name: 'UserRoles',
  components: {
    List,
  },
};
</script>
