<template>

  <empty-layout>

    <v-form
      ref="login"
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
            {{ formatString('custom.login.title') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              :label="formatString('custom.login.identifier')"
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
              :label="formatString('custom.login.password')"
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
              {{ formatString('custom.login.button') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <a href="/password-reset">{{ formatString('custom.login.forgot') }}</a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import {auth} from '@/services/base/auth';
import EmptyLayout from '../layouts/Empty';
import {validations} from '../services/base/validations';

export default {
  name: 'LoginView',
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
    login() {
      if (this.$refs.login.validate()) {
        auth.login('user', this.email, this.password).then((response) => {
          if (response.item.twoFactor) {
            this.$router.push({
              path: "/otp",
              query: {
                type: 'auth',
                optRequestId: response.item.otpRequestId,
                otp: response.item.otp,
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
