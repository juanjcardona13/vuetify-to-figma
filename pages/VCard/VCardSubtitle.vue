<script setup lang="ts">
import { VCardSubtitle } from "vuetify/lib/components/VCard/VCardSubtitle.mjs";

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
    :component-props="VCardSubtitle.props"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['_as']"
    :initial-num-columns="12"
  >
    <template #component="{ combination }">
      <VCardSubtitle v-bind="{ ...combination.props }">
        Subtitle
      </VCardSubtitle>
    </template>
  </ComponentPlayground>
</template>
