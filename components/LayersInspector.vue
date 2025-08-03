<script setup lang="ts">
interface LayerInfo {
  tagName: string;
  className: string;
  id: string;
  textContent: string;
  depth: number;
  styles: {
    display: string;
    position: string;
    width: string;
    height: string;
    backgroundColor: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    margin: string;
    padding: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    zIndex: string;
  };
  attributes: Array<{ name: string; value: string }>;
  children: LayerInfo[];
}

const extractedLayers = inject("extractedLayers", ref<LayerInfo[]>([]));

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
        <div v-if="extractedLayers.length > 0">
          <VExpansionPanels variant="accordion">
            <VExpansionPanel
              v-for="(layer, index) in extractedLayers"
              :key="index"
            >
              <template #title>
                <div class="d-flex align-center">
                  <VIcon
                    :icon="getLayerIcon(layer.tagName)"
                    class="me-2"
                    size="small"
                  />
                  <span class="font-weight-medium">
                    {{ layer.tagName }}
                    <span
                      v-if="layer.className"
                      class="text-caption text-medium-emphasis"
                    >
                      ({{ layer.className }})
                    </span>
                  </span>
                </div>
              </template>
              <template #text>
                <div class="pa-2">
                  <div v-if="layer.textContent" class="mb-2">
                    <strong>Contenido:</strong>
                    {{ layer.textContent }}
                  </div>

                  <div v-if="layer.id" class="mb-2">
                    <strong>ID:</strong>
                    {{ layer.id }}
                  </div>

                  <div class="mb-2">
                    <strong>Estilos:</strong>
                    <VList density="compact">
                      <VListItem
                        v-for="(value, key) in layer.styles"
                        :key="key"
                        class="pa-1"
                      >
                        <div class="d-flex justify-space-between">
                          <span class="text-caption">{{ key }}:</span>
                          <span class="text-caption">{{ value }}</span>
                        </div>
                      </VListItem>
                    </VList>
                  </div>

                  <div v-if="layer.attributes.length > 0" class="mb-2">
                    <strong>Atributos:</strong>
                    <VList density="compact">
                      <VListItem
                        v-for="attr in layer.attributes"
                        :key="attr.name"
                        class="pa-1"
                      >
                        <div class="d-flex justify-space-between">
                          <span class="text-caption">{{ attr.name }}:</span>
                          <span class="text-caption">{{ attr.value }}</span>
                        </div>
                      </VListItem>
                    </VList>
                  </div>
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
