<template>

  <v-layout
    v-if="loading"
    fill-height
    justify-center
    align-center
  >
    {{ translate('$vuetify.app.loading') }}
  </v-layout>
  <v-layout
    v-else-if="submitting"
    fill-height
    justify-center
    align-center
  >
    {{ translate('$vuetify.app.submitting') }}
  </v-layout>
  <v-form
    v-else
    ref="form"
    class="fill-width"
  >

    <v-row
      class="mb-2"
      v-if="repository"
    >
      <v-expansion-panels
        accordion
        multiple
        :value="panels"
        class="justify-start"
      >
        <v-col
          cols="12"
          v-for="(group,i) in groups"
          :key="`group.${i}`"
        >
          <v-expansion-panel
          >

            <v-expansion-panel-header
              color="primary white--text"
            >
              <strong>
                {{ translate(group.name) }}
              </strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="pa-1 pa-sm-4 pa-lg-8 fill-height"
            >
              <slot
                :name="`section-${group.key}`"
              >
                <v-row>
                  <slot
                    v-for="value in group.values"
                    :name="value.key"
                    :fieldKey="value.key"
                  >
                    <v-col
                      cols="12"
                    >

                      <entity-field-edit
                        :repository="repository"
                        :item="item"
                        :field-key="value.key"
                        :field="repository.fields[value.key]"
                        :value="item[group.key][value.key]"
                        @input="item[group.key][value.key] = $event"
                      />

                    </v-col>
                  </slot>
                </v-row>
              </slot>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-col>
      </v-expansion-panels>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="text-center pa-0 pa-md-4 pr-4"
        v-for="(action, index) in actions"
        v-bind:key="index"
      >
        <v-btn
          :class="action.class"
          class="ma-2"
          :color="action.color"
          :to="action.location"
          @click="action.callback(item)"
          large
          block
          :disabled="loading || submitting"
        >

          <v-icon
            v-if="action.icon"
            class="mr-2"
          >
            {{ action.icon }}
          </v-icon>
          {{ action.title }}

        </v-btn>
      </v-col>
    </v-row>

  </v-form>

</template>

<script>
import {toastError, toastSuccess, translate} from '../../plugins/base/vuetify';
import {settings} from '../../services/repositories/settings';
import EntityFieldEdit from './EntityFieldEdit';

const saveHandler = (item) => {
  if (this.$refs.form.validate()) {
    settings.set(item).then(() => {
      toastSuccess('$vuetify.app.submittedSuccessfully');
      this.$router.push('/');
    }).finally(() => {
      this.submitting = false;
      this.$emit('submitting', this.submitting);
    });
  } else {
    toastError('$vuetify.validations.saveFailed');
  }
}

export default {
  name: 'settings-edit',
  components: {EntityFieldEdit},
  data: () => ({
    submitting: false,
    loading: true,
    panels: [],
    groups: [],
    actions: [],
    item: {},
    repository: null,
  }),

  methods: {
    save() {
      if (this.$refs.form.validate()) {
        settings.set(this.item).then(() => {
          toastSuccess('$vuetify.app.submittedSuccessfully');
          this.$router.push('/');
        }).finally(() => {
          this.submitting = false;
          this.$emit('submitting', this.submitting);
        });
      } else {
        toastError('$vuetify.validations.saveFailed');
      }
    },

    defaultCrumbs() {
      return [
        {
          icon: translate('$vuetify.home.icon'),
          title: translate('$vuetify.home.pageTitle'),
          location: '/',
        },
        {
          title: translate('$vuetify.settings.pageTitle'),
        },
      ];
    },

    defaultActions() {
      return this.actions;
    },
  },

  mounted() {
    this.groups = {};
    this.actions = [
      {
        icon: 'mdi-content-save',
        color: 'success',
        title: translate('$vuetify.app.save'),
        callback: (item) => {
          this.save(item);
        }
      },
      {
        icon: 'mdi-close-circle',
        class: 'white--text',
        color: 'grey',
        title: translate('$vuetify.app.cancel'),
        location: '/',
        callback: () => {
          // do nothing since location will redirect us
        }
      },
    ];

    this.loading = true;
    this.$emit('loading', this.loading);
    settings.definition().then((response) => {
      this.groups = response.items;
      this.item = {};
      const fields = {};
      this.groups.forEach((group, index) => {
        this.item[group.key] = {};
        group.values.forEach((value) => {
          this.item[group.key][value.key] = value.value;
          fields[value.key] = {
            label: value.name,
            type: value.type,
            hint: value.description,
            optional: value.optional,
            multiple: value.multiple,
          };
        });
      });
      this.repository = {
        entity: settings.entity,
        slug: settings.slug,
        fields: fields,
      };
      this.loading = false;
      this.$emit('loading', this.loading);
      this.$forceUpdate();
    }).catch((reason) => {
      const message = reason.headers.get('Message') ?? translate('$vuetify.errors.general');
      const messageArguments = reason.headers.get('Message-Arguments') ?? '';
      toastError(message, ...messageArguments.split('###'));
    });
  },
};
</script>
