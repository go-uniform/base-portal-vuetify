<template>

  <empty-layout>

    <v-form
      ref="login"
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
            Log into your account
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
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="password"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="passwordShow ? 'text' : 'password'"
              :label="format('Password')"
              @click:append="passwordShow = !passwordShow"
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
              @click="login"
            >
              {{ format('Login') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <a href="/password-reset">Forgot password?</a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import {auth} from '@/services/auth';
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'LoginView',
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
    login() {
      if (this.$refs.login.validate()) {
        auth.login('user', this.email, this.password).then((response) => {
          if (response.token.twoFactor) {
            this.$router.push({
              path: "/otp",
              query: {
                type: 'auth',
                optRequestId: response.token.otpRequestId,
                otp: response.token.otp,
                redirect: this.$route.query.redirect,
              }
            });
          } else if (this.$route.query.redirect != null) {
            this.$router.push(this.$route.query.redirect.toString());
          } else {
            this.$router.push('/');
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>
