<template>
    <v-snackbar v-model="showNotice" :color="color" top  :timeout="timeout">
        <div
            v-show="false"
            class="v-menu__content--active"
        />
        {{message}}
        <v-btn icon color="#fff" @click.native="clear()">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>
<script>
import { bus } from '../main';

export default {
    created() {
        bus.$on('alert.custom', (color, message) => {
            this.custom(color, message);
        });
        bus.$on('alert.info', (message) => {
            this.info(message);
        });
        bus.$on('alert.warning', (message) => {
            this.warning(message);
        });
        bus.$on('alert.error', (message) => {
            this.error(message);
        });
        bus.$on('alert.success', (message) => {
            this.success(message);
        });
        bus.$on('alert.clear', () => {
            this.clear();
        });
    },
    data: () => ({
        showNotice: false,
        color: 'error',
        timeout: 30000,
        message: null,
    }),
    methods: {
        custom(color, message) {
            this.showNotice = false;
            if (message && message.length > 0) {
                this.color = color;
                this.message = message;
                this.showNotice = true;
            }
            this.$alert.showNotice = this.showNotice;
            this.$alert.color = this.color;
            this.$alert.message = this.message;
            this.$alert.timeout = this.timeout;
        },
        info(message) {
            this.custom('info', message);
        },
        error(message) {
            this.custom('error', message);
        },
        warning(message) {
            this.custom('warning', message);
        },
        success(message) {
            this.custom('success', message);
        },
        clear() {
            this.showNotice = false;
            this.$alert.showNotice = this.showNotice;
        },
    },
    mounted() {
        this.showNotice = this.$alert.showNotice;
        this.color = this.$alert.color;
        this.message = this.$alert.message;
        this.timeout = this.$alert.timeout;
    }
}
</script>