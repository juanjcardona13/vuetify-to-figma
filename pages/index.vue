<script setup lang="ts">
// import * as vuetify_locale from 'vuetify/locale';
// import * as vuetify_directives from 'vuetify/directives';
import * as vuetify_labs_components from "vuetify/labs/components";
import * as vuetify_components from "vuetify/components";

const vuetifyComponents = Object.keys(vuetify_components);
const vuetifyLabsComponents = Object.keys(vuetify_labs_components);
</script>

<template>
  <div>
    <h1>Vuetify Components</h1>
    <div class="d-flex flex-wrap ga-2">
      <VBtn
        v-for="component in vuetifyComponents"
        :key="component"
        :to="`/${component}`"
        :text="component"
        variant="tonal"
        color="primary"
        elevation="1"
        style="text-transform: none !important"
      />
    </div>

    <h1>Vuetify Labs Components</h1>
    <div class="d-flex flex-wrap ga-2">
      <VBtn
        v-for="component in vuetifyLabsComponents"
        :key="component"
        :to="`/${component}`"
        :text="component"
      />
    </div>
  </div>
</template>
