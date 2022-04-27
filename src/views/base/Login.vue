<template>

  <empty-layout>

    <v-form
      ref="login"
      v-model="valid"
      lazy-validation
      class="text-center mw-320"
      :disabled="submitting"
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
            {{ translate('$vuetify.login.title') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              :label="translate('$vuetify.login.identifier')"
              v-model="email"
              :rules="[rules.required]"
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
              :label="translate('$vuetify.login.password')"
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
              :loading="submitting"
            >
              {{ translate('$vuetify.login.button') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <a href="/password-reset">{{ translate('$vuetify.login.forgot') }}</a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import {auth} from '@/services/base/auth';
import EmptyLayout from '../../layouts/base/Empty';
import {validations} from '../../services/base/validations';
import {translate} from '../../plugins/base/vuetify';

export default {
  name: 'LoginView',
  components: {EmptyLayout},
  data: () => ({
    submitting: false,
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

    login() {
      if (this.$refs.login.validate()) {
        this.submitting = true;
        auth.login('user', this.email, this.password).then((response) => {
          if (response.item.twoFactor) {
            this.$router.push({
              path: "/otp",
              query: {
                type: 'auth',
                otpRequestId: response.item.otpRequestId,
                otp: response.item.otp,
                redirect: this.$route.query.redirect,
              }
            });
          } else if (this.$route.query.redirect != null) {
            this.$router.push(this.$route.query.redirect.toString());
          } else {
            this.$router.push('/');
          }
        }).catch(() => {
          this.submitting = false;
        });
      }
    },
  },
};
</script>
