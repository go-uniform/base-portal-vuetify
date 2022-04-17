<template>

  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >

    <v-card>

      <v-toolbar
        dark
        :color="options.color"
        dense
        flat
      >

        <v-toolbar-title
          class="white--text"
        >
          {{ title }}
        </v-toolbar-title>

      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4"
      >
        {{ message }}
      </v-card-text>
      <v-card-actions
        class="pt-0"
      >

        <v-spacer/>
        <v-btn
          :color="options.color"
          text
          @click.native="agree"
        >
          {{ format(options.agreeTitle) }}
        </v-btn>
        <v-btn
          color="grey"
          text
          @click.native="cancel"
        >
          {{ format(options.cancelTitle) }}
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>
import {bus} from '@/services/base/bus';

export default {
  name: 'confirm-box',

  data: () => ({
    dialog: false,
    callback: null,
    message: null,
    title: null,
    options: {
      color: 'primary',
      width: 290,
      zIndex: 200,
      agreeTitle: 'Yes',
      cancelTitle: 'No',
    }
  }),

  methods: {
    agree() {
      this.dialog = false;
      if (this.callback) {
        this.callback(true);
      }
      bus.publish('confirm.closed', true);
    },

    cancel() {
      this.dialog = false;
      if (this.callback) {
        this.callback(false);
      }
      bus.publish('confirm.closed', false);
    }
  },

  created() {
    bus.subscribe('confirm', (message) => {
      this.callback = message.callback;
      this.title = message.title;
      this.message = message.body;
      this.options = Object.assign(this.options, message.options);
      this.dialog = true;
    });
  },
}
</script>
