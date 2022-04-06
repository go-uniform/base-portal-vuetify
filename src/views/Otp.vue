<template>

  <v-form
    ref="otp"
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
          <v-otp-input
            v-model="otp"
            length="6"
            :rules="[rules.required]"

          ></v-otp-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            :disabled="!valid || !isFilled"
            color="success"
            class="mr-4"
            @click="validate"
          >
            {{ __('Validate') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
import {auth} from '../services/auth';
import {bus} from '../services/bus';

export default {
  name: 'Otp',
  components: {},
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
    otpAuth() {
      auth.otp(this.otpRequestId, this.otp).then((response) => {
        if (this.$route.query.redirect != null) {
          this.$router.push(this.$route.query.redirect.toString());
        } else {
          this.$router.push('/users');
        }
      }).finally(() => {
        this.loading = false;
      });
    },

    validate() {
      if (this.$refs.otp.validate()) {
        switch (this.type.toLowerCase()) {
          default:
            bus.publish('toast.show', {
              type: 'error',
              message: __('custom.errors.unknownOtpType', [this.type]),
            });
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
