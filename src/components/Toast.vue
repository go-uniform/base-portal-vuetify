<template>

  <div
    v-if="messages.length > 0"
    class="toast-container"
    @click="backgroundInteraction"
  >
    <v-alert
      v-for="message in messages"
      @input="alertClosed(message.key)"
      v-bind:key="message.key"
      :type="message.type"
      dismissible
    >

      {{ message.text }}

    </v-alert>
  </div>

</template>

<script>
import {bus} from '@/services/bus';

export default {
  name: 'ToastComponent',
  data: () => ({
    counter: 0,
    messages: [],
  }),
  methods: {
    alertClosed(key) {
      const index = this.messages.findIndex(message => message.key === key);
      if (index > -1) {
        this.messages.splice(index, 1);
      }
    },
    backgroundInteraction() {
      if (this.messages.length > 0) {
        this.messages.pop();
      }
    }
  },
  created() {
    bus.subscribe('toast.show', (toast) => {
      const key = this.counter++;
      const index = this.messages.findIndex(message => message.key === key);
      const message = {
        key: key,
        type: toast.type,
        text: toast.message,
      };
      if (index > -1) {
        this.messages[index] = message;
      } else {
        this.messages.push(message);
      }
    });
    bus.subscribe('toast.clear', () => {
      this.show = false;
    });
  },
  mounted() {
    window.addEventListener('keypress', (ev) => {
      if (['Enter','Space','NumpadEnter'].includes(ev.key)) {
        this.backgroundInteraction(ev);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.toast-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  padding: 16px;
}
</style>
