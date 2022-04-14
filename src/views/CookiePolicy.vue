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
              {{ format(item.title) }}
            </v-breadcrumbs-item>

          </template>

        </v-breadcrumbs>

      </v-toolbar>
    </template>

    <div
      class="pa-8"
    >

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet sem dapibus, placerat orci a, euismod
        lacus. Mauris eget eros id ex convallis dictum sit amet vel felis. Donec lectus quam, mattis quis velit
        faucibus, congue finibus metus. In neque mi, tristique nec mattis ac, tristique vel dolor. Donec posuere justo
        orci, congue vehicula nibh luctus sit amet. Integer mi mi, dapibus ultrices tortor et, sollicitudin posuere
        sapien. Nulla facilisi. Proin congue arcu vel mattis molestie. Phasellus felis quam, tincidunt non eros eu,
        tempus sodales ligula. In euismod consectetur porta.
      </p>
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
import EmptyLayout from '../layouts/Empty';
import {format} from '../plugins/vuetify';

export default {
  name: 'CookiePolicy',
  components: {EmptyLayout},

  data: () => ({
    showCookieConsent: false,
    crumbs: [
      {
        icon: 'mdi-home',
        title: format('Home'),
        location: '/',
      },
      {
        title: 'Cookie Consent'
      }
    ],
  }),

  created() {
    this.showCookieConsent = true;
  },
};
</script>
