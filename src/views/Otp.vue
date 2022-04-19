<template>

  <empty-layout>

    <v-form
      ref="otp"
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
            Enter your one-time-pin
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
          <v-col>
            <v-btn
              block
              :disabled="!valid || !isFilled"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ formatString('Validate') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </empty-layout>

</template>

<script>
import {auth} from '../services/base/auth';
import {toastError} from '../plugins/vuetify';
import EmptyLayout from '../layouts/Empty';

export default {
  name: 'OtpView',
  components: {
    EmptyLayout,
  },
  data: () => ({
    type: null,
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
  },
};
</script>
