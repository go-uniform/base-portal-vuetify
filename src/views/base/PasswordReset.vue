<template>

  <empty-layout>

    <v-form
      ref="passwordReset"
      v-model="valid"
      lazy-validation
      class="text-center mw-320"
    >
      <v-container>
        <v-row
          class="py-8"
        >
          <v-img
            :alt="translate('$vuetify.app.standaloneLogoFullAlt')"
            contain
            :src="getLogo($vuetify.theme.dark ? '$vuetify.app.standaloneLogoFullDark' : '$vuetify.app.standaloneLogoFullLight')"
            transition="scale-transition"
            max-height="200"
          />
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            {{ translate('$vuetify.passwordReset.title') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              :label="translate('$vuetify.passwordReset.identifier')"
              v-model="email"
              :rules="[rules.required, rules.email]"
              autofocus
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-btn
              block
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="reset"
            >
              {{ translate('$vuetify.passwordReset.button') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <a href="/login">{{ translate('$vuetify.app.backLogin') }}</a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../../layouts/base/Empty';
import {validations} from '../../services/base/validations';
import {translate} from '../../plugins/base/vuetify';

export default {
  name: 'PasswordResetView',
  components: {EmptyLayout},
  data: () => ({
    valid: true,
    email: null,
    password: null,
    passwordShow: false,
    rules: {
      required: validations.required(false),
    },
  }),
  methods: {
    getLogo(logo) {
      const logos = require.context('@/assets/logos', true);
      return logos('./' + translate(logo));
    },

    reset() {
      alert('reset password!');
    },
  },
};
</script>
