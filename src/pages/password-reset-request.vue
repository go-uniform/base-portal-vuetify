<template>
  <empty-layout>

    <v-row align="center" justify="center">
      <v-col class="text-center">
        <div class="d-flex justify-center align-center white--text">
          <v-form class="ma-auto" v-model="isValid">
            <p>
              <span class="display-1 font-weight-bold">Reset Password</span>
              <br>
              <span class="title">Enter your e-mail address.</span>
            </p>
            <br>
            <div>
              <v-text-field
                  rounded
                  background-color="white"
                  filled
                  :disabled="loading"
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[v => !!v || 'Email is required']"
              ></v-text-field>
            </div>
            <div class="text-center">
              <v-btn
                  block
                  rounded
                  x-large
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  @click="reset()"
              >Reset
              </v-btn>
            </div>
            <br>
            <br>
            <div>
              <router-link to="/login" class="white--text">Back To Login Page</router-link>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </empty-layout>
</template>

<script>
import {Api} from "../services/client";
import {bus} from "../main";
import EmptyLayout from "../layouts/empty"

export default {
  components: {
    EmptyLayout,
  },
  data: () => ({
    isValid: true,
    show: false,
    email: null,
    password: null,
    loading: false,
  }),
  methods: {
    reset() {
      if (this.email == null) {
        bus.$emit('alert.error', "Field may not be empty");
        return
      }
      this.loading = true;

      Api.auth
          .reset("administrator", this.email, "token", "email")
          .then(res => {
            if (res.status === 401) {
              this.$router.push("/login");
              return;
            } else if (res.status !== 200) {
              bus.$emit('alert.error', res.headers.get("Message"));
              return;
            }
            bus.$emit('alert.success', 'If your account exists we have sent a reset link to your email');
            this.$router.push("/login");
          })
          .catch(() => {
            bus.$emit('alert.error', "Server unreachable");
          })
          .finally(() => {
            this.loading = false;
          });
    }
  }
};
</script>
