<script setup lang="ts">
import { VCardActions } from "vuetify/lib/components/VCard/VCardActions.mjs";

const ignoreProps = ["_as", "tag", "style", "class"];

const definitionsProps: Record<string, { howUse: string; values: unknown[] }> = {
    _as: {
        howUse: "Figma native",
        values: ["div"],
    },
};
</script>

<template>
  <ComponentPlayground
    :component-props="VCardActions.props"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['_as']"
    :initial-num-columns="12"
  >
    <template #component="{ combination }">
      <VCardActions v-bind="{ ...combination.props }">
        <VBtn text="button 1" />
        <VBtn text="button 2" />
        <VBtn text="button 3" />
        <VBtn text="button 4" />
        <VBtn text="button 5" />
      </VCardActions>
    </template>
  </ComponentPlayground>
</template>
