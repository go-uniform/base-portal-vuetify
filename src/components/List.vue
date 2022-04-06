<template>

  <div>
    <v-data-table
      :items="records"
      :headers="headers"
    >
      <template v-slot:item.createdAt="{item}">
        {{ item.createdAt | datetime }}
      </template>
      <template v-slot:item.actions="{item}">
        <v-btn
          icon
        >
          <v-icon>
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn
          icon
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import {users} from '../services/repositories/users';

export default {
  name: 'List',
  props: {
    repository: null,
  },
  data: () => ({
    records: [],
    headers: [],
  }),
  methods: {
    load() {
      console.log(this.repository);
      this.headers = this.repository.tableHeaders();
      this.headers.push({
        text: 'Actions',
        value: 'actions',
        align: 'end',
        sortable: false,
      })
      this.repository.list().then((response) => {
        this.records = response.items;
      })
    }
  },
  mounted() {
    this.load();
  }
};
</script>
