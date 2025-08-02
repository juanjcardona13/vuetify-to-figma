<script setup lang="ts">
import { VProgressLinear } from "vuetify/components/VProgressLinear";

const slots = ["default"];
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
    showContent: {
      howUse:
        "Habilita el slot default, en direct properties, search for 'showContent' y cambia el valor a true o false segun lo que necesites",
      values: [true, false],
    },
    modelValue: {
      howUse: "Figma native",
      values: [50],
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
    width: {
      howUse: "Figma native",
      values: [undefined],
    },
    size: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Size' and then select the value you want to use",
      values: ["default", "x-small", "small", "large", "x-large"],
    },
    theme: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Theme' and then select the value you want to use",
      values: ["dark", "light"],
    },
  };

const finalProps = computed(() => {
  return {
    showContent: true,
    ...VProgressLinear.props,
  };
});
</script>

<template>
  <ComponentPlayground
    :component-props="finalProps"
    :definitions-props="definitionsProps"
    :ignore-props="ignoreProps"
    :initial-props-to-show="['showContent', 'modelValue']"
  >
    <template #component="{ combination }">
      <VProgressLinear v-bind="{ ...combination.props }">
        <template v-if="combination.props.showContent" #default> 0 </template>
      </VProgressLinear>
    </template>
  </ComponentPlayground>
</template>
