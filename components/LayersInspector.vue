<script setup lang="ts">
defineProps<{
  extractedLayer: LayerInfo;
}>();

const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

// Función para obtener el icono según el tipo de elemento
const getLayerIcon = (
  tagName: string,
  isVuetifyComponent?: boolean
): string => {
  const iconMap: Record<string, string> = {
    div: "mdi-square-outline",
    span: "mdi-text",
    p: "mdi-text",
    button: "mdi-gesture-tap-button",
    input: "mdi-form-textbox",
    img: "mdi-image",
    svg: "mdi-vector-polyline",
    path: "mdi-vector-polyline",
    circle: "mdi-circle-outline",
    rect: "mdi-square-outline",
    a: "mdi-link",
    ul: "mdi-format-list-bulleted",
    li: "mdi-format-list-numbered",
    table: "mdi-table",
    tr: "mdi-table-row",
    td: "mdi-table-cell",
    th: "mdi-table-headers-eye",
    form: "mdi-form-select",
    label: "mdi-label",
    textarea: "mdi-form-textarea",
    select: "mdi-form-dropdown",
    option: "mdi-menu-down",
    h1: "mdi-format-header-1",
    h2: "mdi-format-header-2",
    h3: "mdi-format-header-3",
    h4: "mdi-format-header-4",
    h5: "mdi-format-header-5",
    h6: "mdi-format-header-6",
  };

  return isVuetifyComponent ? "$vuetify" : iconMap[tagName] || "mdi-tag";
};
</script>

<template>
  <VSheet
    v-if="extractedLayer.isVuetifyComponent"
    color="blue-lighten-3"
    rounded="lg"
    class="px-2 py-3"
  >
    <VIcon icon="$vuetify" size="small" class="me-2" />
    <span class="font-weight-medium">
      {{ extractedLayer.figmaLayerName }}
    </span>
  </VSheet>

  <VExpansionPanels v-else :color="'grey-lighten-3'" elevation="0">
    <VExpansionPanel>
      <template #title>
        <div class="d-flex align-center">
          <VIcon
            :icon="
              getLayerIcon(
                extractedLayer.tagName,
                extractedLayer.isVuetifyComponent
              )
            "
            class="me-2"
            size="small"
          />
          <span class="font-weight-medium">
            {{ extractedLayer.figmaLayerName }}
            <span
              v-if="extractedLayer.className"
              class="text-caption text-medium-emphasis"
            >
              ({{ extractedLayer.className }})
            </span>
          </span>
        </div>
      </template>
      <VExpansionPanelText class="border">
        <div class="pa-2" style="max-width: 800px">
          <VExpansionPanels elevation="0" class="mb-2 border">
            <VExpansionPanel>
              <VExpansionPanelTitle>Texto y estilos</VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDivider class="mb-2" />
                <div v-if="extractedLayer.textContent?.text" class="mb-2">
                  <strong>Texto:</strong>

                  <div class="d-flex flex-wrap">
                    <template
                      v-for="(value, key) in extractedLayer.textContent"
                      :key="key"
                    >
                      <VChip
                        :text="`${camelToKebab(key)}: ${value}`"
                        size="x-small"
                        class="border mb-1"
                        :variant="key === 'text' ? 'flat' : 'text'"
                      />
                      <VDivider vertical class="ma-1" />
                    </template>
                  </div>
                </div>

                <div class="mb-2">
                  <strong>Estilos:</strong>

                  <div class="d-flex flex-wrap">
                    <template
                      v-for="(value, key) in extractedLayer.styles"
                      :key="key"
                    >
                      <VChip
                        :text="`${camelToKebab(key)}: ${value}`"
                        size="x-small"
                        class="border mb-1"
                        :variant="'text'"
                      />
                      <VDivider vertical class="ma-1" />
                    </template>
                  </div>
                </div>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <!-- Children -->
          <template v-if="extractedLayer.children?.length > 0">
            <div class="mb-2 font-weight-bold">
              Hijos ({{ extractedLayer.children.length }})
            </div>
            <template v-for="child in extractedLayer.children" :key="child.id">
              <LayersInspector class="mb-2" :extracted-layer="child" />
            </template>
          </template>
        </div>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
