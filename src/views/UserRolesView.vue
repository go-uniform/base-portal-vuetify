<template>

  <div>
    <EntityView
      :repository="require('../services/repositories/userRoles').userRoles"
      :id="$route.params.id"
    >
    </EntityView>
  </div>

</template>

<script>
// @ is an alias to /src
import EntityView from '../components/EntityView';

export default {
  name: 'UserRolesView',
  components: {
    EntityView,
  },
};
</script>
