<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";

const props = defineProps<{
  id: string;
  applyTheme: boolean;
  applyBorder: boolean;
  bgColorPlayground: string;
  componentName: string;
  combination: {
    props: Record<string, unknown>;
    label: {
      key?: string | undefined;
      value?: string | undefined;
    };
  };
}>();

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

function getStyles(element: HTMLElement) {
  const computedStyle: CSSStyleDeclaration = window.getComputedStyle(element);
  return {
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
  };
}

function getTextContent(element: HTMLElement) {
  const computedStyle: CSSStyleDeclaration = window.getComputedStyle(element);

  let directText: string = "";
  for (const node of Array.from(element.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      directText += (node.textContent ?? "").trim();
    }
  }

  return {
    text: directText,
    fontFamily: computedStyle.fontFamily,
    fontSize: computedStyle.fontSize,
    fontWeight: computedStyle.fontWeight,
    lineHeight: computedStyle.lineHeight,
    letterSpacing: computedStyle.letterSpacing,
    color: computedStyle.color,
    textTransform: computedStyle.textTransform,
    textAlign: computedStyle.textAlign,
  };
}

function getDomAsJson(element: HTMLElement, figmaLayerName: string): LayerInfo {
  const result: LayerInfo = {
    id: element.id || "",
    isVuetifyComponent: false,
    tagName: element.tagName.toLowerCase(),
    figmaLayerName,
    className: element.className || "",
    textContent: getTextContent(element),
    styles: getStyles(element),
    children: [],
  };

  for (const child of Array.from(element.children) as HTMLElement[]) {
    if (getVuetifyComponentName(child)) {
      result.children.push({
        figmaLayerName: kebabToPascal(getVuetifyComponentName(child)),
        isVuetifyComponent: true,
        tagName: child.tagName.toLowerCase(),
        styles: getStyles(child),
        textContent: getTextContent(child),
        children: [],
      });
    } else {
      result.children.push(getDomAsJson(child, getFigmaLayerName(child)));
    }
  }

  return result;
}

const extractedLayer = ref<LayerInfo>();

const buildLayers = () => {
  const slotElement = document.getElementById(props.id);
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

const slotWrapper = useTemplateRef<HTMLDivElement>("slotWrapper");

const { stop } = useMutationObserver(
  slotWrapper,
  (_mutations) => {
    buildLayers();
  },
  {
    childList: true, // altas/bajas de hijos
    subtree: true, // observar todo el árbol interno
    attributes: true, // cambios de atributos
    characterData: true, // cambios de texto
  }
);

onMounted(() => {
  buildLayers();
});

onUnmounted(() => stop());

const wrapperVApp = inject("wrapperVApp", false);
const tab = ref("properties");
const componentWrapper = ref(wrapperVApp ? "VApp" : "VSheet");

defineExpose({
  extractedLayer,
  componentWrapper,
});
</script>

<template>
  <VMenu open-on-hover :close-on-content-click="false">
    <template #activator="{ props: menuBtnProps }">
      <component
        :is="componentWrapper"
        :id="id"
        v-bind="menuBtnProps"
        ref="slotWrapper"
        class="d-flex justify-center align-center pa-2 rounded-lg"
        :theme="applyTheme ? (combination.props.theme as string) : undefined"
        :border="applyBorder ? 'sm' : undefined"
        :color="applyTheme ? undefined : bgColorPlayground"
      >
        <slot name="component" :combination="combination" />
      </component>
    </template>
    <VCard>
      <VTabs v-model="tab">
        <VTab value="properties">Properties</VTab>
        <VTab value="layers"> Layers </VTab>
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
</template>
