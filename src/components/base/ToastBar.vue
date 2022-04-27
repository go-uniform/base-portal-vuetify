<template>
  <div
    v-if="messages.length > 0"
    class="toast-container"
    @click="messagesPopLast"
  >
    <div
      class="toast-inner-container"
    >
      <v-alert
        v-for="message in messages"
        @input="messagesPopSpecific(message.key)"
        v-bind:key="message.key"
        :type="message.type"
        dismissible
      >
        {{ message.text }}
      </v-alert>
    </div>
  </div>
</template>

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
.toast-inner-container {
  position: fixed;
  top:15px;
  left:15px;
  right:15px;
}
</style>

<script>
import {bus} from '@/services/base/bus';

export default {
  name: 'toast-bar',

  data: () => ({
    counter: 0,
    messages: [],
  }),

  methods: {

    messagesPopSpecific(key) {
      const index = this.messages.findIndex(message => message.key === key);
      if (index > -1) {
        this.messages.splice(index, 1);
        if (window.sessionStorage) {
          window.sessionStorage.setItem('toast.messages', JSON.stringify(this.messages));
        }
      }
    },

    messagesPopLast() {
      if (this.messages.length > 0) {
        this.messages.pop();
        if (window.sessionStorage) {
          window.sessionStorage.setItem('toast.messages', JSON.stringify(this.messages));
        }
      }
    }

  },

  created() {
    if (window.sessionStorage) {
      const sessionMessages = JSON.parse(window.sessionStorage.getItem('toast.messages'));
      if (sessionMessages && sessionMessages.length > 0) {
        this.messages = sessionMessages;
      }
    }

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

      if (window.sessionStorage) {
        window.sessionStorage.setItem('toast.messages', JSON.stringify(this.messages));
      }
    });

    bus.subscribe('toast.clear', () => {
      this.show = false;
      this.messages = [];

      if (window.sessionStorage) {
        window.sessionStorage.setItem('toast.messages', JSON.stringify(this.messages));
      }
    });

  },

  mounted() {
    window.addEventListener('keypress', (ev) => {
      if (['Enter','Space','NumpadEnter'].includes(ev.key)) {
        this.messagesPopLast();
      }
    });
  }

};
</script>
