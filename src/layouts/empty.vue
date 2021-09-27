<template>
    <v-app class="background login-page">
        <v-container class="fill-height" fluid>

            <alert ref="alert"></alert>
            <slot></slot>

        </v-container>

        <v-footer absolute class="hidden-sm-and-down transparent">
            <v-col class="white--text text-center" cols="12">
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
    };
</script>
