<script setup lang="ts">
import { VCardItem } from "vuetify/lib/components/VCard/VCardItem.mjs";


const ignoreProps = [
  "_as",
  "tag",
  "style",
  "class",
  "exact",
  "href",
  "location",
  "readonly",
  "replace",
  "ripple",
  "selectedClass",
  "symbol",
  "to",
  "value",
];

const definitionsProps: Record<string, { howUse: string; values: unknown[] }> =
  {
    prependAvatar: {
      howUse: "",
      values: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    },
    prependIcon: {
      howUse: "",
      values: ["$vuetify"],
    },
    title: {
      howUse:
        "In direct properties, search for 'title' and write the value you want to use",
      values: ["Title"],
    },
    subtitle: {
      howUse:
        "In direct properties, search for 'subtitle' and write the value you want to use",
      values: ["Subtitle"],
    },
    density: {
      howUse: "In direct properties, search for 'density'",
      values: [  "compact", "comfortable", "default",],
    },
    appendAvatar: {
      howUse: "",
      values: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    },
    appendIcon: {
      howUse: "",
      values: ["$vuetify"],
    },
  };
</script>

<template>
  <ComponentPlayground
    :component-props="VCardItem.props"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['title']"
    :initial-num-columns="6"
  >
    <template #component="{ combination }">
      <VCardItem v-bind="{ ...combination.props }" />
    </template>
  </ComponentPlayground>
</template>
