<template>

  <div>
    <v-data-table
      :items="records"
      :headers="headers"
    >
      <template
        v-for="(column, index) in columns()"
        v-slot:[column]="{header, item}"
      >

        <slot
          v-if="isLink(header)"
          :name="column"
          :item="item"
          :header="header"
        >
          <a
            :key="index"
            :href="`${repository.fields[header.value].linkTargetPath}/${item.id}`"
          >
            {{ item[repository.fields[header.value].linkLabelField] }}
          </a>
        </slot>
        <slot
          v-else-if="column !== 'item.actions'"
          :name="column"
          :item="item"
          :header="header"
        >
          <div
            :key="index"
          >
            {{ doFormat(header, item) }}
          </div>
        </slot>
        <slot
          v-else-if="column === 'item.actions'"
        >
          <div
            :key="index"
          >
            <slot
              name="actions.wrapper"
              :item="item"
            >
              <v-menu>
                <template
                  v-slot:activator="{ on, attrs }"
                >
                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <slot
                      name="actions"
                      :item="item"
                    >
                    </slot>
                    <slot
                      name="actions.delete"
                      :item="item"
                    >
                      <v-btn
                        class="ma-2"
                        color="danger"
                        @click="remove(item)"
                      >
                        <v-icon>mdi-delete</v-icon>&nbsp;{{ __('Delete') }}
                      </v-btn>
                    </slot>
                    <slot
                      name="actions.edit"
                      :item="item"
                    >
                      <v-btn
                        class="ma-2"
                        color="accent"
                        @click="edit(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>&nbsp;{{ __('Edit') }}
                      </v-btn>
                    </slot>
                    <slot
                      name="actions.view"
                      :item="item"
                    >
                      <v-btn
                        class="ma-2"
                        color="primary"
                        @click="view(item)"
                      >
                        <v-icon>mdi-eye</v-icon>&nbsp;{{ __('View') }}
                      </v-btn>
                    </slot>
                  </v-list-item>
                </v-list>
              </v-menu>
            </slot>
          </div>
        </slot>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import {formatBoolean, formatDate, formatDatetime} from '../plugins/vuetify';

export default {
  name: 'EntityList',
  props: {
    repository: null,
    hideHeaders: [],
    prefixHeaders: [],
    suffixHeaders: [],
  },
  data: () => ({
    records: [],
    headers: [],
  }),
  methods: {
    isLink(header) {
      const field = this.repository.fields[header.value];
      if (!field) {
        return false;
      }
      return field.type === 'linkId';
    },
    doFormat(header, item) {
      let value = item[header.value];
      const fieldType = this.repository.fields[header.value].type;
      switch (fieldType) {
        case "boolean":
          value = formatBoolean(value);
          break
        case "date":
          value = formatDate(value);
          break
        case "datetime":
          value = formatDatetime(value);
          break
      }
      return value;
    },
    columns() {
      return this.headers.map(x => {
        return 'item.' + x.value;
      });
    },
    load() {
      function prepend(array, values) {
        let newArray = array.slice();
        values.reverse().forEach((value) => {
          newArray.unshift(value);
        });
        return newArray;
      }

      this.headers = this.repository.tableHeaders();
      if (this.prefixHeaders) {
        this.headers = prepend(this.headers, this.prefixHeaders);
      }
      if (this.suffixHeaders) {
        this.suffixHeaders.forEach((header) => {
          this.headers.push(header);
        });
      }
      this.headers.push({
        text: 'Actions',
        value: 'actions',
        align: 'end',
        sortable: false,
      })

      if (this.hideHeaders) {
        this.headers = this.headers.filter(item => !this.hideHeaders.includes(item.value));
      }

      this.repository.list().then((response) => {
        this.records = response.items;
      })
    },
    remove(item) {
      // todo: show confirmation box
      this.repository.delete(item.id).then(() => {
        this.load();
      });
    },
    edit(item) {
      this.$router.push(`${this.repository.editPagePrefix}/${item.id}`);
    },
    view(item) {
      this.$router.push(`${this.repository.viewPagePrefix}/${item.id}`);
    }
  },
  mounted() {
    this.load();
  }
};
</script>
