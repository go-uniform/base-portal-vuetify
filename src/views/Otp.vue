<template>

  <empty-layout>

    <v-form
      ref="otp"
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
            {{ formatString('custom.otp.title') }}
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
              :disabled="!valid || !isFilled"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ formatString('custom.otp.validate') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
          >
            <v-btn
              block
              :disabled="!valid || !isFilled"
              color="accent"
              class="mr-4"
              @click="resend"
            >
              {{ formatString('custom.otp.resend') }}
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
import {confirmation, formatString, toastError} from '../plugins/vuetify';
import EmptyLayout from '../layouts/Empty';

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
    rules: {
      required: (value) => !!value || 'Required.',
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
        toastError('custom.errors.unknownOtpType', this.type);
        break;
      case 'auth':
        this.backHidden = false;
        this.backLocation = ['/login'];
        this.backText = formatString('custom.app.backLogin');
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
      auth.otp(this.otpRequestId, this.otp).then(() => {
        if (this.$route.query.redirect != null) {
          this.$router.push(this.$route.query.redirect.toString());
        } else {
          this.$router.push('/');
        }
      }).finally(() => {
        this.loading = false;
      });
    },

    validate() {
      if (this.$refs.otp.validate()) {
        switch (this.type.toLowerCase()) {
          default:
            toastError('custom.errors.unknownOtpType', this.type);
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
          alert('resend code');
        }
      }, 'Are you sure?', formatString('Resending will generate a new code and invalidate the previously sent code, only use this if you have not received the code in a timely fashion. Are you still sure you wish to resend yourself a new code?'), {
        color: 'accent'
      })
    },
  },
};
</script>
