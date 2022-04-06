<template>

  <div>
    <EntityEdit
      :repository="require('../services/repositories/userRoles').userRoles"
      :id="$route.params.id"
    >
    </EntityEdit>
  </div>

</template>

<script>
// @ is an alias to /src
import EntityEdit from '../components/EntityEdit';

export default {
  name: 'UserRolesEdit',
  components: {
    EntityEdit,
  },
};
</script>
