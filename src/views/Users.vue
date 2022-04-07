<template>

  <div>
    <EntityList
      :repository="require('../services/repositories/users').users"
    >
    </EntityList>
  </div>

</template>

<script>
// @ is an alias to /src
import EntityList from '../components/EntityList';

export default {
  name: 'UsersView',
  components: {
    EntityList,
  },
};
</script>
