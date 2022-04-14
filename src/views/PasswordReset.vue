<template>

  <empty-layout>

    <v-form
      ref="passwordReset"
      v-model="valid"
      lazy-validation
      class="text-center"
      style="max-width:320px"
    >
      <v-container>
        <v-row
          class="py-8"
        >
            <v-img
              alt="Vuetify Name"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
              style="max-height:100px"
            />
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            Reset password
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              :label="format('Username or Email')"
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
              {{ format('Reset') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <a href="/login">Back to login</a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'PasswordResetView',
  components: {EmptyLayout},
  data: () => ({
    valid: true,
    email: null,
    password: null,
    passwordShow: false,
    rules: {
      required: value => !!value || 'Required.',
      email: value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Must be a valid email address'
    },
  }),
  methods: {
    reset() {
      alert('reset password!');
    },
  },
};
</script>
