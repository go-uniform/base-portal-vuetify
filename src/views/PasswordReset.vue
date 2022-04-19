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
            :alt="formatString('custom.app.smallLogoAlt')"
            contain
            :src="formatString('custom.app.smallLogoUrl')"
            transition="scale-transition"
            max-height="100"
          />
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            {{ formatString('custom.passwordReset.title') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              :label="formatString('custom.passwordReset.identifier')"
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
              {{ formatString('custom.passwordReset.button') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <a href="/login">{{ formatString('custom.app.backLogin') }}</a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';
import {validations} from '../services/base/validations';

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
    reset() {
      alert('reset password!');
    },
  },
};
</script>
