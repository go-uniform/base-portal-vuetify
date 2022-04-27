<template>

  <empty-layout>

    <v-form
      ref="otp"
      v-model="valid"
      lazy-validation
      class="text-center mw-320"
      :disabled="submitting || resending"
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
            {{ translate('$vuetify.otp.title') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-otp-input
              v-model="otp"
              length="6"
              :rules="[rules.required]"
              autofocus
              @finish="validate"
              @keypress="keypress"
            ></v-otp-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-btn
              block
              :disabled="!valid || !isFilled || resending"
              color="success"
              class="mr-4"
              @click="validate"
              :loading="submitting"
            >
              {{ translate('$vuetify.otp.validate') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <v-btn
              block
              :disabled="submitting"
              color="accent"
              class="mr-4"
              @click="resend"
              :loading="resending"
            >
              {{ translate('$vuetify.otp.resend') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            v-if="!backHidden"
          >
            <a :href="backLocation">
              {{ backText }}
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import {auth} from '../../services/base/auth';
import {confirmation, translate, toastError, toastSuccess} from '../../plugins/base/vuetify';
import EmptyLayout from '../../layouts/base/Empty';
import {validations} from '../../services/base/validations';

export default {
  name: 'OtpView',
  components: {
    EmptyLayout,
  },

  data: () => ({
    type: null,
    backHidden: true,
    backText: null,
    backLocation: null,
    otp: null,
    valid: true,
    submitting: false,
    resending: false,
    rules: {
      required: validations.required(false),
    },
  }),

  computed: {
    isFilled () {
      return this.otp !== null && this.otp.length === 6;
    },
  },

  mounted() {
    this.type = this.$route.query.type;
    this.otp = this.$route.query.otp;
    switch (this.type.toLowerCase()) {
      default:
        toastError('$vuetify.errors.unknownOtpType', this.type);
        break;
      case 'auth':
        this.backHidden = false;
        this.backLocation = ['/login'];
        this.backText = translate('$vuetify.app.backLogin');
        break;
    }
  },

  methods: {
    getLogo(logo) {
      const logos = require.context('@/assets/logos', true);
      return logos('./' + translate(logo));
    },

    keypress(ev) {
      if (['Enter','NumpadEnter'].includes(ev.key)) {
        this.validate();
      }
    },

    otpAuth() {
      let otpRequestId = this.$route.query.otpRequestId || '';
      this.submitting = true;
      auth.otp(otpRequestId, this.otp).then(() => {
        if (this.$route.query.redirect != null) {
          this.$router.push(this.$route.query.redirect.toString());
        } else {
          this.$router.push('/');
        }
      }).catch(() => {
        this.submitting = false;
      });
    },

    validate() {
      if (this.$refs.otp.validate()) {
        switch (this.type.toLowerCase()) {
          default:
            toastError('$vuetify.errors.unknownOtpType', this.type);
            break;
          case 'auth':
            this.otpAuth();
            break;
        }
      }
    },

    resend() {
      confirmation((confirmed) => {
        if (confirmed) {
          this.resending = true;
          auth.resendOtp(this.otpRequestId).then(() => {
            toastSuccess('$vuetify.otp.resent');
          }).finally(() => {
            this.resending = false;
          });
        }
      }, translate('$vuetify.otp.resendConfirmationTitle'), translate('$vuetify.otp.resendConfirmationMessage'), {
        color: 'accent'
      })
    },
  },
};
</script>
