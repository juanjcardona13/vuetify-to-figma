<script setup lang="ts">
import ComponentItem from "./ComponentItem.vue";

defineProps<{
  componentName: string;
}>();

const bgColorPlayground = inject("bgColorPlayground", ref("#FFFFFF"));
const paginatedCombinations = inject(
  "paginatedCombinations",
  ref<
    {
      props: Record<string, unknown>;
      label: { key?: string; value?: string };
    }[]
  >([])
);
const numColumns = inject("numColumns", ref(2));
const applyTheme = inject("applyTheme", ref(true));
const applyBorder = inject("applyBorder", ref(false));

const componentItems =
  useTemplateRef<InstanceType<typeof ComponentItem>[]>("componentItems");

const copyExtractedLayers = () => {
  const layers = componentItems.value?.map((item) => item.extractedLayer);
  navigator.clipboard.writeText(JSON.stringify(layers, null, 2));
};

const applyVAppWrapper = () => {
  const isApp = componentItems.value?.[0]?.componentWrapper === "VApp";
  componentItems.value?.forEach((item) => {
    if (isApp) {
      item.componentWrapper = "VSheet";
    } else {
      item.componentWrapper = "VApp";
    }
  });
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between mb-2">
      <h6 class="text-h6 mb-2">Playground</h6>
      <div>
        <VBtn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-content-copy"
          text="Change Wrapper"
          class="mr-2"
          @click="applyVAppWrapper"
        />

        <VBtn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-content-copy"
          text="Copiar Layers"
          @click="copyExtractedLayers"
        />
      </div>
    </div>
    <VSheet dense :border="'sm'" rounded="lg" :color="bgColorPlayground">
      <VRow dense>
        <template
          v-for="(realCombination, i) in paginatedCombinations"
          :key="i"
        >
          <VCol :cols="numColumns" class="position-relative relative">
            <ComponentItem
              :id="`combination-${i}`"
              ref="componentItems"
              :apply-theme="applyTheme"
              :apply-border="applyBorder"
              :bg-color-playground="bgColorPlayground"
              :combination="realCombination"
              :component-name="componentName"
            >
              <template #component="{ combination }">
                <slot name="component" :combination="combination" />
              </template>
            </ComponentItem>
          </VCol>
        </template>
      </VRow>
    </VSheet>
  </div>
</template>
