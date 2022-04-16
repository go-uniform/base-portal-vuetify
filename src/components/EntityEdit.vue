<template>

  <v-form
    ref="form"
    class="pa-8"
  >
    <v-container>
      <v-row
        v-for="(field, key) in fields"
        :key="key"
      >
        <v-autocomplete
          v-if="field.type === 'linkId'"
          v-model="item[key]"
          :label="format(field.label)"
        ></v-autocomplete>
        <v-text-field
          v-else
          v-model="item[key]"
          :label="format(field.label)"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col
          cols="6"
        >
          <v-btn
            class="ma-2"
            color="success"
            @click="save"
            large
            block
          >
            <v-icon
              class="mr-2"
            >
              mdi-content-save
            </v-icon>
            {{ format('Save') }}
          </v-btn>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn
            class="ma-2 grey white--text"
            @click="cancel"
            large
            block
          >
            <v-icon
              class="mr-2"
            >
              mdi-close-circle
            </v-icon>
            {{ format('Cancel') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
import {format} from '../plugins/vuetify';

export default {
  name: 'entity-edit',
  props: {
    repository: null,
    id: null,
  },
  computed: {
    fields() {
      if (!this.repository) {
        return {};
      }

      let response = {};
      Object.keys(this.repository.fields).map((key, index) => {
        const field = this.repository.fields[key];
        if (['linkLabel'].includes(field.type)) {
          return;
        }
        if (field.readonly) {
          return;
        }
        response[key] = this.repository.fields[key];
      });

      return response;
    },
  },
  data: () => ({
    item: {},
  }),
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        if (this.$route.params.id) {
          this.repository.update(this.$route.params.id, this.item).then(() => {
            this.$router.push(`${this.repository.viewPagePrefix}/${this.$route.params.id}`);
          });
          return;
        }
        this.repository.create(this.item).then((response) => {
          this.$router.push(`${this.repository.viewPagePrefix}/${response.id}`);
        });
      }
    },

    cancel() {
      if (this.$route.params.id) {
        this.$router.push(`${this.repository.viewPagePrefix}/${this.$route.params.id}`);
        return;
      }
      this.$router.push(`${this.repository.listPage}`);
    },

    defaultCrumbs() {
      if (this.$route.params.id) {
        return [
          {
            icon: 'mdi-home',
            title: format('Home'),
            location: '/',
          },
          {
            title: format(this.repository.title.plural),
            location: this.repository.listPage,
          },
          {
            title: format('View'),
            location: `${this.repository.viewPagePrefix}/${this.$route.params.id}`,
          },
          {
            title: format('Edit'),
          },
        ];
      }
      return [
        {
          icon: 'mdi-home',
          title: format('Home'),
          location: '/',
        },
        {
          title: format(this.repository.title.plural),
          location: this.repository.listPage,
        },
        {
          title: format('New'),
        },
      ];
    },

    defaultActions() {
      let cancelUrl = this.repository.listPage;
      if (this.$route.params.id) {
        cancelUrl = `${this.repository.viewPagePrefix}/${this.$route.params.id}`;
      }
      return [
        {
          icon: 'mdi-content-save',
          color: 'success',
          title: format('Save'),
          callback: () => {
            this.save();
          }
        },
        {
          icon: 'mdi-close-circle',
          class: 'white--text',
          color: 'grey',
          title: format('Cancel'),
          location: cancelUrl,
        },
      ];
    }
  },

  mounted() {
    this.item = this.repository.default;
    if (this.id) {
      this.repository.read(this.id).then((response) => {
        this.item = Object.assign(this.repository.default, response.item);
        this.$forceUpdate();
      }).catch(() => {
        this.$router.push(`${this.repository.listPage}`);
      });
    }
  }
};
</script>
