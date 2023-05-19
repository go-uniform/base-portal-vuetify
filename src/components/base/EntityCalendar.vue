<template>
  <v-layout
      v-if="loading"
      fill-height
      justify-center
      align-center
  >
    {{ translate('$vuetify.app.loading') }}
  </v-layout>
  <div
      v-else
      class="fill-width"
  >
    <slot
        name="filters"
    >
      <entity-list-filters
          :repository="repository"
          v-model="filters"
          @change="load()"
          :disabled="loading"
      />
    </slot>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
              flat
          >
            <v-btn
                outlined
                class="mr-4"
                color="primary"
                @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
                fab
                text
                small
                color="primary"
                @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
                fab
                text
                small
                color="primary"
                @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                color="success"
                :to="repository.addPage"
                class="mr-1"
            >

              <v-icon
              >
                mdi-plus-box
              </v-icon>
              {{ translate('$vuetify.entityCards.new') }}

            </v-btn>
            <v-menu
                bottom
                right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    outlined
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet>
          <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :type="type"
              @click:time="createEvent"
              @click:event="editEvent"
              @click:more="viewDay"
              @click:date="viewDay"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {baseCalendarFields, processCalendarEvents} from "@/services/base/base";
import {translate} from "@/plugins/base/vuetify";
import EntityListFilters from "@/components/base/EntityListFilters.vue";

export default {
  name: "entity-calendar",
  components: {EntityListFilters},

  props: {
    repository: null,
  },

  data: () => ({
    focus: '',
    type: 'month',
    filters: {},
    records: [],
    loading: true,
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    calendarFields: [],
    events: [],
  }),
  mounted () {
    this.load();
  },
  updated() {
    if(!this.loading) {
      this.$refs.calendar.move(0)
    }
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    load() {
      this.loading = true;
      this.$emit('loading', this.loading);
      this.calendarFields = baseCalendarFields(this.repository);

      this.repository.list(null, this.filters, null, null).then((response) => {
        this.records = response.items;
        this.events = processCalendarEvents(this.calendarFields, response.items);
      }).finally(() => {
        this.loading = false;
        this.$emit('loading', this.loading);
      });
    },
    editEvent({ nativeEvent, event }) {
      this.$router.push(`${translate(this.repository.viewPage, event.id)}`);
    },
    createEvent(tms) {
      this.$router.push({
        path : `${translate(this.repository.addPage)}`,
        query: {
          values: {
            title: 'test'
          }
        }
      });
    }
  },
}
</script>

<style scoped>

</style>
