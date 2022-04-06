<template>

  <v-snackbar
    v-model="show"
    :type="type"
    :color="color"
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

</template>

<script>
import {bus} from '@/services/bus';

export default {
  name: 'Toast',
  data: () => ({
    show: false,
    type: 'info',
    color: 'red',
    timeout: 30000,
    message: '',
  }),
  created() {
    bus.subscribe('toast.show',  (toast) => {
      this.show = true;
      if (toast.message && toast.message.length > 0) {
        this.type = toast.type ?? 'info';
        if (!toast.color) {
          toast.color = toast.type;
        }
        this.color = toast.color;
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
