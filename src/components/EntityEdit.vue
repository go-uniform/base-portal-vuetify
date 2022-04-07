<template>

  <v-form
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
          :label="__(field.label)"
        ></v-autocomplete>
        <v-text-field
          v-else
          v-model="item[key]"
          :label="__(field.label)"
        ></v-text-field>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
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
  mounted() {
    // todo: prepare form fields with default values
    if (this.id) {
      this.repository.read(this.id).then((response) => {
        this.item = response.item;
      }).catch(() => {
        this.$router.push(`${this.repository.listPage}`);
      });
    }
  }
};
</script>
