<template>
  <div
    class="fill-width"
  >
    <template
      v-slot:header
      v-if="dashboards.length > 1"
    >
      <v-tabs
        background-color="background"
        v-model="tab"
        show-arrows
        @change="change"
      >
        <v-tab
          v-for="dashboard in dashboards"
          :key="dashboard.value"
          :href="`#${dashboard.value}`"
        >
          {{ dashboard.title }}
        </v-tab>
      </v-tabs>
    </template>

    <v-tabs-items
      v-model="tab"
      v-if="dashboards.length > 1"
    >
      <v-tab-item
        v-for="dashboard in dashboards"
        :key="dashboard.value"
        :value="dashboard.value"
        class="fill-content"
      >
        <iframe
          class="fill-content pb-2 no-border"
        />
      </v-tab-item>
    </v-tabs-items>
    <div
      class="fill-content"
      v-else
    >
      <iframe
        v-if="dashboards.length === 1"
        class="fill-content pb-2 no-border"
      />
      <v-layout
        class="fill-content"
        justify-center
        align-center
        column
        v-else
      >

        <p>
          <small>
            <i>
              You have no dashboards, why not create your first dashboard now.
            </i>
          </small>
        </p>
        <v-btn
          color="success"
          class="mr-2"
        >

          <v-icon>
            mdi-plus-box
          </v-icon>
          New

        </v-btn>
      </v-layout>
    </div>

  </div>
</template>
