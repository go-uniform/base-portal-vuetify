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
            :alt="translate('base.app.smallLogoAlt')"
            contain
            :src="translate('base.app.smallLogoUrl')"
            transition="scale-transition"
            max-height="100"
          />
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            {{ translate('base.otp.title') }}
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
              {{ translate('base.otp.validate') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <v-btn
              block
              :disabled="!valid || !isFilled || submitting"
              color="accent"
              class="mr-4"
              @click="resend"
              :loading="resending"
            >
              {{ translate('base.otp.resend') }}
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
import {auth} from '../services/base/auth';
import {confirmation, translate, toastError} from '../plugins/vuetify';
import EmptyLayout from '../layouts/Empty';
import {validations} from '../services/base/validations';

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
    otpRequestId: null,
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
    this.otpRequestId = this.$route.query.otpRequestId;
    this.otp = this.$route.query.otp;
    switch (this.type.toLowerCase()) {
      default:
        toastError('base.errors.unknownOtpType', this.type);
        break;
      case 'auth':
        this.backHidden = false;
        this.backLocation = ['/login'];
        this.backText = translate('base.app.backLogin');
        break;
    }
  },

  methods: {
    keypress(ev) {
      if (['Enter','NumpadEnter'].includes(ev.key)) {
        this.validate();
      }
    },

    otpAuth() {
      this.submitting = true;
      auth.otp(this.otpRequestId, this.otp).then(() => {
        if (this.$route.query.redirect != null) {
          this.$router.push(this.$route.query.redirect.toString());
        } else {
          this.$router.push('/');
        }
      }).finally(() => {
        this.submitting = false;
      });
    },

    validate() {
      if (this.$refs.otp.validate()) {
        switch (this.type.toLowerCase()) {
          default:
            toastError('base.errors.unknownOtpType', this.type);
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
          alert('resend code');
          setTimeout(() => {
            this.resending = false;
          }, 3000);
        }
      }, translate('base.otp.resendConfirmationTitle'), translate('base.otp.resendConfirmationMessage'), {
        color: 'accent'
      })
    },
  },
};
</script>
