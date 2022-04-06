<template>

  <div>
    Hello World!
    <v-snackbar
      v-model="show"
      content-class="light-blue"
      :timeout="timeout"
      top
    >

      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          color="red"
          v-bind="attrs"
          @click="show = false;"
        >

          <v-icon small>
            mdi-close
          </v-icon>

        </v-btn>
      </template>

    </v-snackbar>
  </div>


</template>

<script>
import {bus} from '@/services/bus';

export default {
  name: 'Toast',
  data: () => ({
    show: true,
    color: 'light-blue',
    timeout: 30000,
    message: 'Test',
  }),
  created() {
    bus.subscribe('toast.show',  function(toast) {
      this.show = false;
      if (toast.message && toast.message.length > 0) {
        this.color = toast.color ?? 'light-blue';
        this.message = toast.message;
        this.timeout = toast.timeout ?? 30000;
        this.show = true;
      }
    });
    bus.subscribe('toast.clear', () => {
      this.show = false;
    });
  },
};
</script>
