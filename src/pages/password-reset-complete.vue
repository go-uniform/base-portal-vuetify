<template>
  <empty-layout>

    <v-row align="center" justify="center">
      <v-col class="text-center">
        <div class="d-flex justify-center align-center white--text">
          <v-form class="ma-auto" v-model="isValid">
            <p>
              <span class="display-1 font-weight-bold">Change Password</span>
              <br>
              <span class="title">Enter your new password.</span>
            </p>
            <br>
            <div>
              <v-text-field
                  rounded
                  background-color="white"
                  filled
                  :disabled="loading"
                  v-model="password"
                  label="Password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  :rules="passwordRules"
                  :error-messages="errors['password']"
                  @click:append="show = !show"
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                  rounded
                  background-color="white"
                  filled
                  :disabled="loading"
                  v-model="confirm"
                  label="Confirmation"
                  :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirm ? 'text' : 'password'"
                  :rules="[ matchPassword ]"
                  :error-messages="errors['confirm']"
                  @click:append="showConfirm = !showConfirm"
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
                  @click="update()"
              >Update
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
import {bus} from '../main';

export default {
  data: () => ({
    show: false,
    showConfirm: false,
    password: null,
    confirm: null,
    loading: false,
    alert: false,
    isValid: true,
    error: null,
    errors: {},
    passwordRules: [
      v => !!v || 'Field is required',
    ],
  }),
  methods: {
    matchPassword(value) {
      if (value !== this.password) {
        return 'Confirmation must match password.';
      } else {
        return true;
      }
    },
    update() {
      this.loading = true;

      let token = this.$route.query.token;
      if (token === undefined || token === null || token.length <= 0) {
        this.alert = true;
        this.error = "Invalid reset request, please try again later";
        return;
      }

      Api.auth
          .resetComplete("administrator", token, this.password)
          .then(res => {
            if (res.status === 401) {
              this.$router.push("/login");
              return;
            } else if (res.status === 400) {
                res.json().then(async (body) => {
                    console.log(body);
                    this.errors = body;
                });
                bus.$emit('alert.error', res.headers.get("Message"));
                return;
            } else if (res.status !== 200) {
              bus.$emit('alert.error', res.headers.get("Message"));
              return;
            }
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
