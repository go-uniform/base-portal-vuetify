<!-- render editing component for any given field based on field type and properties -->
<template>
  <div>

    <div
        v-if="field.type === 'link'"
    >

      <entity-field-view-label
          :field="field"
      />
      <entity-field-edit-link
          :repository="repository"
          :item="item"
          :field="field"
          :value="value"
          @input="input"
      />

    </div>
    <div
        v-else-if="field.type === 'self-reference'"
    >

      <entity-field-view-label
          :field="field"
      />
      <entity-field-edit-self-reference
          :repository="repository"
          :item="item"
          :field="field"
          :value="value"
          @input="input"
      />

    </div>
    <div
        v-else-if="field.type === 'textarea'"
    >

      <entity-field-view-label
          :field="field"
      />
      <v-textarea
          :value="value"
          :counter="field.length"
          :maxlength="field.length"
          :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
          @input="input"
          filled
      >
      </v-textarea>

    </div>
    <div
        v-else-if="field.type === 'datetime'"
    >

      <entity-field-view-label
          :field="field"
      />
      <datetime-selector
          :value="value"
          :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
          @input="input"
          :show-timezone="field.meta && field.meta.showTimezone"
          :show-seconds="field.meta && field.meta.showSeconds"
          :show-milliseconds="field.meta && field.meta.showMilliseconds"
      />

    </div>
    <div
        v-else-if="field.type === 'attributes'"
    >

      <slot
          v-if="attribute.key"
          :name="`${fieldKey}.${attribute.key}`"
      >

        <entity-field-view-label
            :field="{...field,...{label:`${field.label}.${attribute.key}`,optional:true}}"
        />
        <v-text-field
            :value="value"
            @input="input($event)"
            filled
        ></v-text-field>

      </slot>
      <slot
          v-else
          :name="`${fieldKey}.skeleton-loader`"
      >
        <v-skeleton-loader type="sentences" />
      </slot>

    </div>
    <div
        v-else-if="field.type === 'boolean'"
    >
      <v-card>
        <v-card-title>

          <entity-field-view-label
              :field="field"
              hide-required
          />
          <v-spacer></v-spacer>
          <v-switch
              :input-value="value"
              @change="input"
          ></v-switch>

        </v-card-title>
      </v-card>
    </div>
    <div
        v-else-if="field.type === 'enumeration'"
    >

      <entity-field-view-label
          :field="field"
      />
      <v-autocomplete
          item-color="accent white--text"
          color="accent"
          :value="value ? value : (!field.optional ? field.defaultValue : null)"
          :items="field.values"
          :item-text="(item) => {return translate(item.title)}"
          item-value="value"
          :clearable="field.optional"
          :rules="[rules.required(field.optional)]"
          @input="input"
          filled
      >
      </v-autocomplete>

    </div>
    <div
        v-else
    >

      <entity-field-view-label
          :field="field"
      />
      <v-text-field
          :value="value"
          :counter="field.length"
          :maxlength="field.length"
          :rules="[rules.required(field.optional),rules.pattern(field.pattern, field.patternMessage),rules.length(field.length)]"
          @input="input"
          filled
      ></v-text-field>

    </div>

  </div>
</template>

<script>
import {validations} from '../../services/base/validations';
import EntityFieldViewLabel from './EntityFieldViewLabel';
import EntityFieldEditLink from './EntityFieldEditLink';
import EntityFieldEditSelfReference from './EntityFieldEditSelfReference';
import DatetimeSelector from "./DatetimeSelector";

export default {
  name: 'entity-field-edit',
  components: {
    EntityFieldEditSelfReference,
    EntityFieldEditLink,
    EntityFieldViewLabel,
    DatetimeSelector,
  },
  props: {
    repository: null,
    field: null,
    attribute: null,
    value: null,
    item: null,
    fieldKey: null,
  },

  data: () => ({
    linkItems: [],
    rules: {
      required: validations.required,
      pattern: validations.pattern,
      length: validations.length,
    },
    attributes: {},
    showHint: false,
  }),

  methods: {
    input(value) {
      this.$emit('input', value);
    },
  },

  mounted() {
    this.attributes = {};
  },
};
</script>
