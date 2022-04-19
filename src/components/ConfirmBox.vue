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
          {{ translate(title) }}
        </v-toolbar-title>

      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4"
      >
        <div
          v-html="translate(message)"
        ></div>
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
          {{ translate(options.agreeTitle) }}
        </v-btn>
        <v-btn
          color="grey"
          text
          @click.native="cancel"
        >
          {{ translate(options.disagreeTitle) }}
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
      agreeTitle: 'base.app.agreeTitle',
      disagreeTitle: 'base.app.disagreeTitle',
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
