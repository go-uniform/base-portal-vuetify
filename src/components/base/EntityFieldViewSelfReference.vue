<template>
  <div>
    <v-progress-circular
      :size="10"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <span
      v-for="(item, index) in items"
      v-bind:key="index"
    >
      <span
        v-if="index > 0"
        class="mr-1"
      >
        ,
      </span>
      <a
        :href="`${translate(repository.viewPage,item.value)}`"
      >
        {{ item.text }}
      </a>
    </span>
    <small
      v-if="!loading && (!value || value.length <= 0)"
    >
      <i>
        &lt;{{ translate('$vuetify.empty') }}&gt;
      </i>
    </small>
  </div>
</template>

<script>
export default {
  name: 'entity-field-view-self-reference',
  props: {
    tabular: Boolean,
    repository: null,
    field: null,
    value: null,
    item: null,
  },

  data: () => ({
    items: [],
    loading: true,
  }),

  methods: {
    getMultiValue(subValue) {
      if (!subValue) {
        return [];
      }
      if (subValue.constructor === Array) {
        return subValue;
      }
      return [subValue];
    },
  },

  mounted() {
    const values = this.getMultiValue(this.value);
    this.items = [];
    if (!values || values.length <= 0) {
      this.loading = false;
      return;
    }
    for (let i = 0; i < values.length; i++) {
      this.repository.read(values[i]).then((response) => {
        let text = '';
        if (this.field.textAssemblyCallback) {
          text = this.field.textAssemblyCallback(response.item);
        } else {
          text = response.item.name || response.item.text;
        }
        this.items.push({
          value: response.item.id,
          text: text,
        });
        this.loading = false;
      });
    }
  }
};
</script>
