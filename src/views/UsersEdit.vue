<template>

  <div>
    <EntityEdit
      :repository="require('../services/repositories/users').users"
      :id="$route.params.id"
    >
    </EntityEdit>
  </div>

</template>

<script>
// @ is an alias to /src
import EntityEdit from '../components/EntityEdit';

export default {
  name: 'UsersEdit',
  components: {
    EntityEdit,
  },
};
</script>
