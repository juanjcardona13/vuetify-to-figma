<script setup lang="ts">
const props = defineProps<{
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

const tab = ref("properties");

const getFigmaLayerName = (element: HTMLElement) => {
  const className = element.className;
  const classNameArray = className.split(" ");
  if (classNameArray.length === 1) {
    return className.replace(`${props.componentName}__`, "");
  }
  return classNameArray[1];
};

const getVuetifyComponentName = (element: HTMLElement) => {
  const className = element.className;
  if (typeof className === "string") {
    const classNameArray = className.split(" ");
    return (
      classNameArray.find((className) =>
        ALL_COMPONENTS_NAME.includes(className)
      ) || ""
    );
  }
  return "";
};

function getDomAsJson(element: HTMLElement, figmaLayerName: string): LayerInfo {
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
    isVuetifyComponent: false,
    tagName: element.tagName.toLowerCase(),
    figmaLayerName,
    className: element.className || "",
    textContent: {
      text: directText,
      fontFamily: computedStyle.fontFamily,
      fontSize: computedStyle.fontSize,
      fontWeight: computedStyle.fontWeight,
      lineHeight: computedStyle.lineHeight,
      letterSpacing: computedStyle.letterSpacing,
      color: computedStyle.color,
      textTransform: computedStyle.textTransform,
      textAlign: computedStyle.textAlign,
    },
    styles: {
      position: computedStyle.position,
      x: computedStyle.left,
      y: computedStyle.top,
      display: computedStyle.display,
      margin: computedStyle.margin,
      marginLeft: computedStyle.marginLeft,
      marginRight: computedStyle.marginRight,
      marginTop: computedStyle.marginTop,
      marginBottom: computedStyle.marginBottom,
      padding: computedStyle.padding,
      paddingLeft: computedStyle.paddingLeft,
      paddingRight: computedStyle.paddingRight,
      paddingTop: computedStyle.paddingTop,
      paddingBottom: computedStyle.paddingBottom,
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
      borderWidth: computedStyle.borderWidth,
      borderColor: computedStyle.borderColor,
      borderStyle: computedStyle.borderStyle,
      borderRadius: computedStyle.borderRadius,
      background: computedStyle.background,
      backgroundColor: computedStyle.backgroundColor,
      color: computedStyle.color,
      boxShadow: computedStyle.boxShadow,
      zIndex: computedStyle.zIndex,
    },
    children: [],
  };

  // Recorrer hijos solo si son elementos
  for (const child of Array.from(element.children) as HTMLElement[]) {
    if (getVuetifyComponentName(child)) {
      result.children.push({
        figmaLayerName: kebabToPascal(getVuetifyComponentName(child)),
        isVuetifyComponent: true,
        tagName: child.tagName.toLowerCase(),
        children: [],
      });
    } else {
      result.children.push(getDomAsJson(child, getFigmaLayerName(child)));
    }
  }

  return result;
}

const extractedLayer = ref<LayerInfo>();

const handleLayersTabClick = (index: number) => {
  const slotElement = document.querySelector(
    `[data-combination="combination-${index}"]`
  );
  if (slotElement) {
    extractedLayer.value = getDomAsJson(
      slotElement.children[0] as HTMLElement,
      props.componentName
    );
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
                  <VTab value="layers" @click="handleLayersTabClick(i)">
                    Layers
                  </VTab>
                </VTabs>
                <VTabsWindow v-model="tab">
                  <VTabsWindowItem value="properties">
                    <PropertiesInspector :combination="combination" />
                  </VTabsWindowItem>
                  <VTabsWindowItem value="layers">
                    <LayersInspector
                      v-if="extractedLayer"
                      :extracted-layer="extractedLayer"
                    />
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
