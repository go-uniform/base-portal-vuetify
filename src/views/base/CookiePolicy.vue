<template>

  <empty-layout>

    <template v-slot:header>

      <v-toolbar>

        <v-breadcrumbs
          :items="crumbs"
        >

          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
          <template v-slot:item="{ item }">

            <v-breadcrumbs-item
              :to="item.location"
              class="text-subtitle-2 crumb-item"
              :disabled="item.disabled"
              exact
            >

              <v-icon
                v-if="item.icon"
                class="mr-2"
              >
                {{ item.icon }}
              </v-icon>
              {{ translate(item.title) }}

            </v-breadcrumbs-item>

          </template>

        </v-breadcrumbs>

      </v-toolbar>

    </template>
    <div
      class="pa-2 pa-sm-4 pa-lg-8"
    >

      <div
        v-html="translate('$vuetify.cookieConsent.pageHtml')"
      >
      </div>
      <div
        v-if="showCookieConsent"
        class="cookie-consent-placeholder"
      >
      </div>

    </div>

  </empty-layout>

</template>

<style lang="scss" scoped>
.cookie-consent-placeholder {
  height: 300px;
}
</style>

<script>
import EmptyLayout from '../../layouts/base/Empty';

export default {
  name: 'CookiePolicy',
  components: {EmptyLayout},

  data: () => ({
    showCookieConsent: false,
    crumbs: [
      {
        icon: '$vuetify.home.icon',
        title: '$vuetify.home.pageTitle',
        location: '/',
      },
      {
        title: '$vuetify.cookieConsent.pageTitle',
      }
    ],
  }),

  created() {
    this.showCookieConsent = true;
  },
};
</script>
