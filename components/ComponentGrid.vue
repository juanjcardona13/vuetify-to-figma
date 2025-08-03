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

provide("extractedLayers", extractedLayers);

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
                    <PropertiesInspector :combination="combination" />
                  </VTabsWindowItem>
                  <VTabsWindowItem value="layers">
                    <LayersInspector />
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
