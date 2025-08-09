<script setup lang="ts">
import { VAvatar } from "vuetify/components/VAvatar";

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
    active: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'State' and then select 'active'",
      values: [true, false],
    },
    border: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Border Width' and then select the value you want to use",
      values: ["0", undefined, "xs", "sm", "md", "lg", "xl"],
    },
    color: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Color' and then select the value you want to use",
      values: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
      ],
    },
    disabled: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'State' and then select 'disabled'",
      values: [true, false],
    },
    elevation: {
      howUse:
        "In 'Effects' select 'Elevation' and then select the value you want to use",
      values: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24,
      ],
    },
    icon: {
      howUse:
        "First active property 'Show icon' and then select the icon you want to use",
      values: ["$vuetify", false],
    },
    loading: {
      howUse: "In direct properties, search for 'loading'",
      values: [true, false],
    },
    text: {
      howUse:
        "In direct properties, search for 'text' and write the value you want to use",
      values: ["JC"],
    },
    height: {
      howUse: "Figma native",
      values: [undefined],
    },
    width: {
      howUse: "Figma native",
      values: [undefined],
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
    position: {
      howUse: "Figma native, partially supported.",
      values: [undefined],
    },
    appendIcon: {
      howUse: "",
      values: ["$vuetify"],
    },
    rounded: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Border Radius' and then select the value you want to use",
      values: [undefined, "0", "sm", "lg", "xl", "pill"],
    },
    size: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Size' and then select the value you want to use",
      values: [ "x-small", "small", "default", "large", "x-large"],
    },
    density: {
      howUse: "In direct properties, search for 'density'",
      values: [  "compact", "comfortable", "default",],
    },
    stacked: {
      howUse: "In direct properties, search for 'stacked'",
      values: [
        true, 
        false
      ],
    },
    theme: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Theme' and then select the value you want to use",
      values: ["dark", "light"],
    },
    tile: {
      howUse: "Figma native",
      values: [true, false],
    },
    variant: {
      howUse:
        "In direct properties, search for 'variant' and select the value you want to use",
      values: ["elevated", "flat", "tonal", "outlined", "text", "plain"],
    },
    prependIcon: {
      howUse: "",
      values: ["$vuetify"],
    },
  };
</script>

<template>
  <ComponentPlayground
    :component-props="VAvatar.props"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['text']"
  >
    <template #component="{ combination }">
      <VAvatar v-bind="{ ...combination.props }" />
    </template>
  </ComponentPlayground>
</template>
