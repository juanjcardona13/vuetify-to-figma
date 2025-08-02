<script setup lang="ts">
const bgColorPlayground = inject("bgColorPlayground", ref("#FFFFFF"));
const paginatedCombinations = inject("paginatedCombinations", ref<{
    props: Record<string, unknown>;
    label: {
        key?: string;
        value?: string;
    };
}[]>([]));
const numColumns = inject("numColumns", ref(2));
const applyTheme = inject("applyTheme", ref(true));
const applyBorder = inject("applyBorder", ref(false));


const tab = ref("properties");


// Interfaz para las capas extraídas
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

// Función para extraer las capas del elemento
const extractLayers = (element: HTMLElement): LayerInfo[] => {
  const layers: LayerInfo[] = [];

  function traverseElement(el: HTMLElement, depth: number = 0) {
    const layer: LayerInfo = {
      tagName: el.tagName.toLowerCase(),
      className: el.className,
      id: el.id,
      textContent: el.textContent?.trim() || "",
      depth,
      styles: {
        display: getComputedStyle(el).display,
        position: getComputedStyle(el).position,
        width: getComputedStyle(el).width,
        height: getComputedStyle(el).height,
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        fontSize: getComputedStyle(el).fontSize,
        fontWeight: getComputedStyle(el).fontWeight,
        margin: getComputedStyle(el).margin,
        padding: getComputedStyle(el).padding,
        border: getComputedStyle(el).border,
        borderRadius: getComputedStyle(el).borderRadius,
        boxShadow: getComputedStyle(el).boxShadow,
        zIndex: getComputedStyle(el).zIndex,
      },
      attributes: Array.from(el.attributes).map((attr) => ({
        name: attr.name,
        value: attr.value,
      })),
      children: [],
    };

    layers.push(layer);

    // Recorrer elementos hijos
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement;
      traverseElement(child, depth + 1);
    }
  }

  traverseElement(element);
  return layers;
};

// Estado para almacenar las capas extraídas
const extractedLayers = ref<LayerInfo[]>([]);

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

// Función que se ejecuta cuando se hace clic en el tab Layers
const handleLayersTabClick = (
  combination: Record<string, unknown>,
  index: number
) => {
  // Buscar el elemento del slot en el DOM usando el índice
  const slotElement = document.querySelector(
    `[data-combination="combination-${index}"]`
  );
  if (slotElement) {
    const layers = extractLayers(slotElement as HTMLElement);
    console.log("Layers extracted:", layers);
    extractedLayers.value = layers;
    return layers;
  }
  extractedLayers.value = [];
  return [];
};
</script>

<template>
  <div>
    <h6 class="text-h6 mb-2">Playground</h6>
    <VSheet dense :border="'sm'" rounded="lg" :color="bgColorPlayground">
      <VRow dense>
        <template v-for="(combination, i) in paginatedCombinations" :key="i">
          <VCol :cols="numColumns">
            <VMenu open-on-hover :close-on-content-click="false">
              <template #activator="{ props: menuBtnProps }">
                <VSheet
                  v-bind="menuBtnProps"
                  class="d-flex justify-center align-center pa-2 rounded-lg"
                  :theme="
                    applyTheme ? (combination.props.theme as string) : undefined
                  "
                  :border="applyBorder ? 'sm' : undefined"
                  :color="applyTheme ? undefined : bgColorPlayground"
                  :data-combination="`combination-${i}`"
                >
                  <slot name="component" :combination="combination" />
                </VSheet>
              </template>
              <VCard>
                <VTabs v-model="tab">
                  <VTab value="properties">Properties</VTab>
                  <VTab
                    value="layers"
                    @click="handleLayersTabClick(combination, i)"
                  >
                    Layers
                  </VTab>
                </VTabs>
                <VTabsWindow v-model="tab">
                  <VTabsWindowItem value="properties">
                    <VContainer class="elevation-1">
                      <VRow>
                        <VCol cols="12">
                          <h3 class="text-primary mb-2">Propiedades</h3>
                          <div>
                            <template
                              v-for="(value, key) of combination.label"
                              :key="key"
                            >
                              <div class="d-flex align-center">
                                <strong>{{ key }}&nbsp;=&nbsp;</strong>
                                <span>{{ value }}</span>
                              </div>
                            </template>
                          </div>
                        </VCol>
                      </VRow>
                    </VContainer>
                  </VTabsWindowItem>
                  <VTabsWindowItem value="layers">
                    <VContainer class="elevation-1">
                      <VRow>
                        <VCol cols="12">
                          <h3 class="text-primary mb-2">
                            Capas del Componente
                          </h3>
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
                                    <VChip
                                      size="x-small"
                                      color="primary"
                                      class="ms-auto"
                                    >
                                      Profundidad: {{ layer.depth }}
                                    </VChip>
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
                                          <div
                                            class="d-flex justify-space-between"
                                          >
                                            <span class="text-caption"
                                              >{{ key }}:</span
                                            >
                                            <span class="text-caption">{{
                                              value
                                            }}</span>
                                          </div>
                                        </VListItem>
                                      </VList>
                                    </div>

                                    <div
                                      v-if="layer.attributes.length > 0"
                                      class="mb-2"
                                    >
                                      <strong>Atributos:</strong>
                                      <VList density="compact">
                                        <VListItem
                                          v-for="attr in layer.attributes"
                                          :key="attr.name"
                                          class="pa-1"
                                        >
                                          <div
                                            class="d-flex justify-space-between"
                                          >
                                            <span class="text-caption"
                                              >{{ attr.name }}:</span
                                            >
                                            <span class="text-caption">{{
                                              attr.value
                                            }}</span>
                                          </div>
                                        </VListItem>
                                      </VList>
                                    </div>
                                  </div>
                                </template>
                              </VExpansionPanel>
                            </VExpansionPanels>
                          </div>
                          <VAlert
                            v-else
                            type="info"
                            variant="tonal"
                            class="mt-2"
                          >
                            Haz clic en el tab "Layers" para extraer las capas
                            del componente.
                          </VAlert>
                        </VCol>
                      </VRow>
                    </VContainer>
                  </VTabsWindowItem>
                </VTabsWindow>
              </VCard>
            </VMenu>
          </VCol>
        </template>
      </VRow>
    </VSheet>
  </div>
</template>
