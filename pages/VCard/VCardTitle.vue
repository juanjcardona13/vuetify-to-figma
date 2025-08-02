<script setup lang="ts">
import { VCardTitle } from "vuetify/lib/components/VCard/VCardTitle.mjs";

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
    :component-props="VCardTitle.props"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['_as']"
    :initial-num-columns="12"
  >
    <template #component="{ combination }">
      <VCardTitle v-bind="{ ...combination.props }">
        Title
      </VCardTitle>
    </template>
  </ComponentPlayground>
</template>
