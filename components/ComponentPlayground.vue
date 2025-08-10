<script setup lang="ts">
const props = defineProps<{
  componentName: string;
  componentProps: Record<string, { default?: string | undefined }>;
  definitionsProps: GlobalSupportedProps;
  ignoreProps?: string[];
  initialPropsToShow?: string[];
  initialNumColumns?: number;
  wrapperVApp?: boolean;
}>();

const bgColorPlayground = ref("#ffffff");
const numColumns = ref(props.initialNumColumns || 2);
const applyTheme = ref(true);
const applyBorder = ref(false);
const selectedValuesByProp = ref<Record<string, unknown[]>>({});

const {
  search,
  propsShowInPlayground,
  currentPage,
  itemsPerPage,
  props: componentPropsList,
  definitionsProps,
  totalItems,
  totalPages,
  paginatedCombinations,
} = useComponentPlayground(
  props.componentProps,
  props.definitionsProps,
  props.ignoreProps || [],
  props.initialPropsToShow || [],
  computed(() => selectedValuesByProp.value)
);

provide("search", search);
provide("applyTheme", applyTheme);
provide("propsShowInPlayground", propsShowInPlayground);
provide("selectedValuesByProp", selectedValuesByProp);
provide("currentPage", currentPage);
provide("itemsPerPage", itemsPerPage);
provide("numColumns", numColumns);
provide("applyBorder", applyBorder);
provide("bgColorPlayground", bgColorPlayground);
provide("paginatedCombinations", paginatedCombinations);
provide("numColumns", numColumns);
provide("applyTheme", applyTheme);
provide("applyBorder", applyBorder);

console.log(props.wrapperVApp, "============");
provide("wrapperVApp", props.wrapperVApp);
</script>

<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="3">
        <PropsPanel
          :component-props-list="componentPropsList"
          :definitions-props="definitionsProps"
        />
      </VCol>
      <VCol cols="9">
        <PlaygroundControls
          :total-items="totalItems"
          :total-pages="totalPages"
          :paginated-combinations="paginatedCombinations"
        />

        <VRow dense>
          <VCol cols="12" class="d-flex justify-end">
            <VMenu>
              <template #activator="{ props: menuBtnProps }">
                <VBtn v-bind="menuBtnProps" icon="mdi-palette" />
              </template>
              <VSheet class="pa-2">
                <VColorPicker v-model="bgColorPlayground" />
              </VSheet>
            </VMenu>
          </VCol>
          <VCol cols="2">
            <PropsSorter />
          </VCol>
          <VCol v-if="paginatedCombinations.length > 0" cols="10">
            <ComponentGrid :component-name="componentName">
              <template #component="{ combination }">
                <slot name="component" :combination="combination" />
              </template>
            </ComponentGrid>
          </VCol>
          <VCol v-else cols="12">
            <VAlert type="info" variant="tonal">
              No hay combinaciones para mostrar. Selecciona al menos una
              propiedad en el panel izquierdo.
            </VAlert>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
