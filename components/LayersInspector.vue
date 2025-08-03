<script setup lang="ts">
interface LayerInfo {
  id: string;
  tagName: string;
  className: string;
  textContent: {
    text: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    color: string;
  };
  styles: {
    position: string;
    display: string;
    margin: string;
    padding: string;
    gap: string;
    flexDirection: string;
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    alignItems: string;
    justifyContent: string;
    opacity: string;
    border: string;
    borderRadius: string;
    background: string;
    color: string;
    boxShadow: string;
    zIndex: string;
  };
  children: LayerInfo[];
}

const extractedLayer = inject("extractedLayer", ref<LayerInfo>());

const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

// Función para obtener el icono según el tipo de elemento
const getLayerIcon = (tagName: string): string => {
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

  return iconMap[tagName] || "mdi-tag";
};
</script>

<template>
  <VContainer class="elevation-1">
    <VRow>
      <VCol cols="12">
        <h3 class="text-primary mb-2">Capas del Componente</h3>
        <div v-if="extractedLayer">
          <VExpansionPanels variant="accordion">
            <VExpansionPanel>
              <template #title>
                <div class="d-flex align-center">
                  <VIcon
                    :icon="getLayerIcon(extractedLayer.tagName)"
                    class="me-2"
                    size="small"
                  />
                  <span class="font-weight-medium">
                    {{ extractedLayer.tagName }}
                    <span
                      v-if="extractedLayer.className"
                      class="text-caption text-medium-emphasis"
                    >
                      ({{ extractedLayer.className }})
                    </span>
                  </span>
                </div>
              </template>
              <template #text>
                <div class="pa-2">
                  <div v-if="extractedLayer.textContent.text" class="mb-2">
                    <strong>Contenido:</strong>
                    {{ extractedLayer.textContent.text }}
                  </div>

                  <div v-if="extractedLayer.id" class="mb-2">
                    <strong>ID:</strong>
                    {{ extractedLayer.id }}
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

                  <!-- Children -->
                </div>
              </template>
            </VExpansionPanel>
          </VExpansionPanels>
        </div>
        <VAlert v-else type="info" variant="tonal" class="mt-2">
          Haz clic en el tab "Layers" para extraer las capas del componente.
        </VAlert>
      </VCol>
    </VRow>
  </VContainer>
</template>
