<template>

  <v-form
    ref="login"
    v-model="valid"
    lazy-validation
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            :label="__('Email')"
            v-model="email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            v-model="password"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="passwordShow ? 'text' : 'password'"
            :label="__('Password')"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login"
          >
            {{ __('Login') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
import {auth} from '@/services/auth';

export default {
  name: 'LoginView',
  components: {},
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
            this.$router.push('/users');
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>
