<template>
    <empty-layout>
        <v-row align="center" justify="start">
            <v-col class="text-center">
                <div class="d-flex justify-center align-center white--text">
                    <v-form class="ma-auto" v-model="isValid">
                        <p>
                            <span class="display-1 font-weight-bold">
                                <strong>Portal</strong>
                            </span>
                            <br/>
                            <br/>
                        </p>
                        <br>
                        <div style="max-width:420px;margin:auto;">
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
                            <div>
                                <v-text-field
                                    filled
                                    rounded
                                    background-color="white"
                                    :disabled="loading"
                                    v-model="password"
                                    label="Password"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"
                                    :rules="[v => !!v || 'Password is required']"
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
                                    @click="login()"
                                >Login
                                </v-btn>
                            </div>
                            <br>
                            <br>
                            <div>
                                <router-link to="password-reset-request" class="white--text">Forgot Password?
                                </router-link>
                            </div>
                        </div>
                    </v-form>
                </div>
            </v-col>
        </v-row>
    </empty-layout>
</template>

<script>
import EmptyLayout from "../layouts/empty"
import {auth} from "../services/base";
import {bus} from "../services/bus";

export default {
    components: {
        EmptyLayout,
    },
    data: () => ({
        show: false,
        email: null,
        password: null,
        loading: false,
        error: null,
        isValid: true,
    }),
    methods: {
        login() {
            bus.publish('toast.clear');
            this.loading = true;

            auth.login('user', this.email, this.password).then((response) => {

              if (response.token.twoFactor) {
                this.$router.push({ path: "/otp", query: { type: 'auth', optRequestId: response.token.otpRequestId, otp: response.token.otp }});
              } else if (this.$route.query.redirect != null) {
                this.$router.push(this.$route.query.redirect.toString());
              } else {
                this.$router.push('/');
              }

            }).finally(() => {
              this.loading = false;
            });
        }
    }
};
</script>
