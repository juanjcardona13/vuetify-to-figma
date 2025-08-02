<script setup lang="ts">
import type { VImgSlots } from "vuetify/lib/components/VImg/VImg.mjs";
import { VImg } from "vuetify/components/VImg";

const slots: Array<keyof VImgSlots> = [
  "default",
  "error",
  "placeholder",
  "sources"
];
console.log(slots);

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
    src: {
      howUse: "Figma native",
      values: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    },
    aspectRatio: {
      howUse: "Figma native",
      values: ["16/9", "1", "4/3"],
    },
    cover: {
      howUse: "Figma native",
      values: [true, false],
    },
    
    height: {
      howUse: "Figma native",
      values: [undefined],
    },
    width: {
      howUse: "Figma native",
      values: [300],
    },
    color: {
      howUse: "Figma native",
      values: ["primary", "secondary", "success", "info", "warning", "error"],
    },
    rounded: {
      howUse: "Figma native",
      values: [ undefined, "0", "xs", "sm", true, "lg", "xl", "pill"],
    },
    maxHeight: {
      howUse: "Figma native",
      values: [undefined],
    },
    maxWidth: {
      howUse: "Figma native",
      values: [undefined],
    },
    minHeight: {
      howUse: "Figma native",
      values: [undefined],
    },
    minWidth: {
      howUse: "Figma native",
      values: [undefined],
    },
  };
</script>

<template>
  <ComponentPlayground
    :component-props="VImg.props"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['src', 'width']"
  >
    <template #component="{ combination }">
      <VContainer>
        <VImg v-bind="{ ...combination.props }" />
      </VContainer>
    </template>
  </ComponentPlayground>
</template>
