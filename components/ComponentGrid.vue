<script setup lang="ts">
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

const tab = ref("layers");

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

function getDomAsJson(element: HTMLElement): LayerInfo {
  // Obtener estilos computados una sola vez por elemento
  const computedStyle: CSSStyleDeclaration = window.getComputedStyle(element);

  // Obtener solo el texto directo del elemento (excluyendo texto de hijos)
  let directText: string = "";
  for (const node of Array.from(element.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      directText += (node.textContent ?? "").trim();
    }
  }

  // Construir el objeto JSON
  const result: LayerInfo = {
    id: element.id || "",
    tagName: element.tagName,
    className: element.className || "",
    textContent: {
      text: directText,
      fontSize: computedStyle.fontSize,
      fontWeight: computedStyle.fontWeight,
      lineHeight: computedStyle.lineHeight,
      letterSpacing: computedStyle.letterSpacing,
      color: computedStyle.color,
    },
    styles: {
      position: computedStyle.position,
      display: computedStyle.display,
      margin: computedStyle.margin,
      padding: computedStyle.padding,
      gap: computedStyle.gap,
      flexDirection: computedStyle.flexDirection,
      width: computedStyle.width,
      minWidth: computedStyle.minWidth,
      maxWidth: computedStyle.maxWidth,
      height: computedStyle.height,
      minHeight: computedStyle.minHeight,
      maxHeight: computedStyle.maxHeight,
      alignItems: computedStyle.alignItems,
      justifyContent: computedStyle.justifyContent,
      opacity: computedStyle.opacity,
      border: computedStyle.border,
      borderRadius: computedStyle.borderRadius,
      background: computedStyle.background,
      color: computedStyle.color,
      boxShadow: computedStyle.boxShadow,
      zIndex: computedStyle.zIndex,
    },
    children: [],
  };

  // Recorrer hijos solo si son elementos
  for (const child of Array.from(element.children) as HTMLElement[]) {
    result.children.push(getDomAsJson(child));
  }

  return result;
}
// Estado para almacenar las capas extraídas
const extractedLayer = ref<LayerInfo>();

provide("extractedLayer", extractedLayer);

// Función que se ejecuta cuando se hace clic en el tab Layers
const handleLayersTabClick = (index: number) => {
  // Buscar el elemento del slot en el DOM usando el índice
  const slotElement = document.querySelector(
    `[data-combination="combination-${index}"]`
  );
  if (slotElement) {
    extractedLayer.value = getDomAsJson(slotElement as HTMLElement);
    return extractedLayer.value;
  }
  extractedLayer.value = undefined;
  return undefined;
};
</script>

<template>
  <div>
    <h6 class="text-h6 mb-2">Playground</h6>
    <VSheet dense :border="'sm'" rounded="lg" :color="bgColorPlayground">
      <VRow dense>
        <template v-for="(combination, i) in paginatedCombinations" :key="i">
          <VCol :cols="numColumns">
            <VMenu
              open-on-hover
              :close-on-content-click="false"
              :model-value="true"
            >
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
                  <VTab value="layers" @click="handleLayersTabClick(i)">
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
