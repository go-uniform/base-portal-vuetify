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
import {Api} from "../services/client";
import {bus} from '../main';
import EmptyLayout from "../layouts/empty"

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
            bus.$emit('alert.clear');
            this.loading = true;

            Api.auth
                .login("administrator", this.email, this.password)
                .then((r) => {
                    let res = r.res;
                    if (res.status !== 200) {
                        bus.$emit('alert.error', res.headers.get("Message"));
                        return;
                    }
                    if (r.body['two-factor']) {
                        this.$router.push({ path: "/validate", query: { token: r.body.token, redirect: this.$route.query.redirect }});
                        return;
                    }
                    this.$router.push(this.$route.query.redirect || "/");
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
