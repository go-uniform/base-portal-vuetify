<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import browser from 'browser-detect';

export default {
  name: 'app',
  created: function () {
    const result = browser();
    if(result.name === 'ie'){
      this.$router.push('/browser/not-supported');
    }
  },
}
</script>

