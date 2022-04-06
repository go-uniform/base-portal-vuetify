<template>

  <div>
    <EntityView
      :repository="require('../services/repositories/users').users"
      :id="$route.params.id"
    >
    </EntityView>
  </div>

</template>

<script>
// @ is an alias to /src
import EntityView from '../components/EntityView';

export default {
  name: 'UsersView',
  components: {
    EntityView,
  },
};
</script>
