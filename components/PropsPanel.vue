<script setup lang="ts">
const props = defineProps<{
  componentPropsList: Array<{
    name: string;
    supported: boolean;
    key: string;
  }>;
  definitionsProps: Record<
    string,
    {
      howUse: string;
      values: unknown[];
      type: "boolean" | "freeValues" | "fixedValues";
    }
  >;
}>();

const search = inject("search", ref(""));
const applyTheme = inject("applyTheme", ref(true));
const propsShowInPlayground = inject(
  "propsShowInPlayground",
  ref<string[]>([])
);
const selectedValuesByProp = inject(
  "selectedValuesByProp",
  ref<Record<string, unknown[]>>({})
);

// Función para obtener los valores seleccionados de un prop
const getSelectedValues = (propKey: string): unknown[] => {
  return selectedValuesByProp.value[propKey] || [];
};

// Función para actualizar los valores seleccionados de un prop
const updateSelectedValues = (propKey: string, values: unknown[]): void => {
  selectedValuesByProp.value[propKey] = values;
};

// Helpers para edición de valores libres (freeValues)
const getFreeValueText = (propKey: string): string => {
  const selected = getSelectedValues(propKey);
  const current =
    selected && selected[0] !== undefined
      ? selected[0]
      : (props.definitionsProps?.[propKey]?.values?.[0] ?? "");
  return current === undefined ? "" : String(current);
};

const setFreeValueText = (propKey: string, value: string): void => {
  updateSelectedValues(propKey, [value]);
};
</script>

<template>
  <div>
    <span class="text-subtitle-1"> Props </span>

    <VTextField v-model="search" label="Search" clearable />
    <VSheet max-height="500" class="overflow-y-auto">
      <VExpansionPanels variant="accordion" multiple>
        <VExpansionPanel
          v-for="item in componentPropsList"
          :key="item.name"
          :readonly="!item.supported"
          :collapse-icon="item.supported ? '$collapse' : ''"
          :expand-icon="item.supported ? '$expand' : ''"
        >
          <template #title>
            <div class="d-flex align-center justify-space-between w-100">
              <div class="d-flex align-center">
                <span class="me-2">{{ item.name }}</span>
                <VTooltip location="top">
                  <template #activator="{ props: tooltipProps }">
                    <VIcon
                      v-bind="tooltipProps"
                      :icon="
                        item.supported ? 'mdi-check-circle' : 'mdi-close-circle'
                      "
                      :color="item.supported ? 'success' : 'error'"
                      size="small"
                    />
                  </template>
                  <span>
                    {{ item.supported ? "Is supported" : "Not supported" }}
                  </span>
                </VTooltip>
              </div>

              <div class="d-flex align-end flex-column justify-center me-2">
                <div class="d-flex align-center ga-2">
                  <VSwitch
                    v-if="
                      item.key === 'theme' &&
                      propsShowInPlayground.includes(item.key)
                    "
                    v-model="applyTheme"
                    v-tooltip="
                      'Aplicar el tema seleccionado al wrapper de los componentes'
                    "
                    color="success"
                    hide-details
                  />
                  <VSwitch
                    v-if="item.supported"
                    v-model="propsShowInPlayground"
                    :value="item.key"
                    color="primary"
                    hide-details
                    @click.stop
                  />
                </div>
                <small v-if="item.supported" class="ms-2 text-medium-emphasis">
                  Show in playground
                </small>
              </div>
            </div>
          </template>

          <template #text>
            <div v-if="item.supported">
              <div class="mb-4">
                <strong>How to use:</strong>
                <p v-if="definitionsProps[item.key]" class="mt-2">
                  {{ definitionsProps[item.key].howUse }}
                </p>
                <p v-else class="mt-2 text-error">
                  ❌ No instructions available
                </p>
              </div>

              <div v-if="definitionsProps[item.key]?.values">
                <strong>Available values:</strong>
                <div class="mt-2">
                  <VChipGroup
                    :model-value="getSelectedValues(item.key)"
                    multiple
                    column
                    @update:model-value="
                      (values) => updateSelectedValues(item.key, values)
                    "
                  >
                    <VChip
                      v-for="(value, index) in definitionsProps[item.key]
                        .values"
                      :key="index"
                      :value="value"
                      variant="outlined"
                      filter
                      size="small"
                    >
                      {{ value === undefined ? "undefined" : String(value) }}
                    </VChip>
                  </VChipGroup>
                </div>

                <div
                  v-if="definitionsProps[item.key]?.type === 'freeValues'"
                  class="mt-3"
                >
                  <VTextField
                    :model-value="getFreeValueText(item.key)"
                    label="Custom value"
                    density="compact"
                    hide-details
                    clearable
                    @update:model-value="
                      (val) => setFreeValueText(item.key, val ?? '')
                    "
                  />
                </div>
              </div>
            </div>
          </template>
        </VExpansionPanel>
      </VExpansionPanels>
    </VSheet>
  </div>
</template>
