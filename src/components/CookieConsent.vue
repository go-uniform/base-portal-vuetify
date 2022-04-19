<template>

  <div
    v-if="showCookieConsent"
    class="cookie-consent"
  >

    <v-card
      class="pa-4"
      outlined
    >

      <v-card-title>
        {{ translate('custom.cookieConsent.popUpTitle') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        v-html="translate('custom.cookieConsent.popUpBody')"
      >
      </v-card-text>
      <v-divider></v-divider>
      <br>
      <v-card-actions>
        <v-btn
          color="info"
          block
          @click="accept"
        >
          {{ translate('custom.cookieConsent.popUpBtn') }}
        </v-btn>
      </v-card-actions>

    </v-card>

  </div>

</template>

<style lang="scss" scoped>
.cookie-consent {
  max-width: 300px;
  position: fixed;
  left: 15px;
  bottom: 15px;
  z-index: 10;
}
</style>

<script>
export default {
  name: 'cookie-consent',

  data: () => ({
    showCookieConsent: true,
  }),

  methods: {
    accept() {
      this.showCookieConsent = false;
      if (window && window.localStorage) {
        window.localStorage.setItem('cookie.consent', 'true');
      }
    }
  },

  created() {
    if (window && window.localStorage) {
      const consent = window.localStorage.getItem('cookie.consent');
      if (consent !== null) {
        this.showCookieConsent = !(consent === 'true');
      }
    }
  },
}
</script>
