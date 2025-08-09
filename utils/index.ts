// https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties#h_01HBH47NCGPF4ZER4PC9AQG7S0
// https://www.figma.com/plugin-docs/api/ComponentPropertyType/
export type ComponentPropertyType =
  | "BOOLEAN"
  | "TEXT"
  | "INSTANCE_SWAP"
  | "VARIANT";

export type ComponentProps = {
  name: string;
  key: string;
  default: string;
  supported: boolean;
  figmaType: ComponentPropertyType | "VARIABLE_MODE" | undefined;
};

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const objectIsEmpty = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0;
};

// Función para generar todas las combinaciones posibles
export const generateCombinations = (
  propsShowInPlayground: string[],
  definitionsProps: Record<string, { values: unknown[] }>
) => {
  // Filtrar solo las props que están habilitadas y tienen definiciones
  const availableProps = propsShowInPlayground.filter(
    (prop) => definitionsProps[prop]
  );

  // Si no hay props activas, retornar array vacío
  if (availableProps.length === 0) {
    return [];
  }

  // Generar solo combinaciones completas (todas las propiedades incluidas)
  const generateFullCombinations = (
    propList: string[],
    values: Record<string, unknown[]>
  ) => {
    const result: Array<{
      props: Record<string, unknown>;
      label: { key?: string; value?: string };
    }> = [];

    // Función recursiva para generar combinaciones completas
    const combine = (
      currentProps: Record<string, unknown>,
      propIndex: number,
      label: Record<string, string>
    ) => {
      if (propIndex === propList.length) {
        // Solo agregar si incluye todas las propiedades
        if (Object.keys(currentProps).length === propList.length) {
          result.push({ props: { ...currentProps }, label });
        }
        return;
      }

      const currentProp = propList[propIndex];
      const propValues = values[currentProp];

      // Incluir esta prop con cada uno de sus valores
      propValues.forEach((value) => {
        const newProps = { ...currentProps, [currentProp]: value };
        const valueLabel = value === undefined ? "undefined" : String(value);
        const newLabel = objectIsEmpty(label)
          ? {
              [currentProp]: valueLabel,
            }
          : { ...label, [currentProp]: valueLabel };
        combine(newProps, propIndex + 1, newLabel);
      });
    };

    combine({}, 0, {});
    return result;
  };

  // Crear objeto con valores para cada prop
  const propValues: Record<string, unknown[]> = {};
  availableProps.forEach((prop) => {
    propValues[prop] = definitionsProps[prop].values;
  });

  return generateFullCombinations(availableProps, propValues);
};

export const ALL_COMPONENTS_NAME = [
  "v-alert",
  "v-alert-title",
  "v-app",
  "v-app-bar",
  "v-app-bar-nav-icon",
  "v-app-bar-title",
  "v-autocomplete",
  "v-avatar",
  "v-badge",
  "v-banner",
  "v-banner-actions",
  "v-banner-text",
  "v-bottom-navigation",
  "v-bottom-sheet",
  "v-breadcrumbs",
  "v-breadcrumbs-divider",
  "v-breadcrumbs-item",
  "v-btn",
  "v-btn-group",
  "v-btn-toggle",
  "v-calendar",
  "v-calendar-day",
  "v-calendar-header",
  "v-calendar-interval",
  "v-calendar-interval-event",
  "v-calendar-month-day",
  "v-card",
  "v-card-actions",
  "v-card-item",
  "v-card-subtitle",
  "v-card-text",
  "v-card-title",
  "v-carousel",
  "v-carousel-item",
  "v-checkbox",
  "v-checkbox-btn",
  "v-chip",
  "v-chip-group",
  "v-class-icon",
  "v-code",
  "v-col",
  "v-color-picker",
  "v-combobox",
  "v-component-icon",
  "v-confirm-edit",
  "v-container",
  "v-counter",
  "v-data-iterator",
  "v-data-table",
  "v-data-table-footer",
  "v-data-table-headers",
  "v-data-table-row",
  "v-data-table-rows",
  "v-data-table-server",
  "v-data-table-virtual",
  "v-date-input",
  "v-date-picker",
  "v-date-picker-controls",
  "v-date-picker-header",
  "v-date-picker-month",
  "v-date-picker-months",
  "v-date-picker-years",
  "v-defaults-provider",
  "v-dialog",
  "v-dialog-bottom-transition",
  "v-dialog-top-transition",
  "v-dialog-transition",
  "v-divider",
  "v-empty-state",
  "v-expand-transition",
  "v-expand-x-transition",
  "v-expansion-panel",
  "v-expansion-panels",
  "v-expansion-panel-text",
  "v-expansion-panel-title",
  "v-fab",
  "v-fab-transition",
  "v-fade-transition",
  "v-field",
  "v-field-label",
  "v-file-input",
  "v-footer",
  "v-form",
  "v-hover",
  "v-icon",
  "v-img",
  "v-infinite-scroll",
  "v-input",
  "v-item",
  "v-item-group",
  "v-kbd",
  "v-label",
  "v-layout",
  "v-layout-item",
  "v-lazy",
  "v-ligature-icon",
  "v-list",
  "v-list-group",
  "v-list-img",
  "v-list-item",
  "v-list-item-action",
  "v-list-item-media",
  "v-list-item-subtitle",
  "v-list-item-title",
  "v-list-subheader",
  "v-locale-provider",
  "v-main",
  "v-menu",
  "v-messages",
  "v-navigation-drawer",
  "v-no-ssr",
  "v-number-input",
  "v-otp-input",
  "v-overlay",
  "v-pagination",
  "v-parallax",
  "v-picker",
  "v-picker-title",
  "v-progress-circular",
  "v-progress-linear",
  "v-pull-to-refresh",
  "v-radio",
  "v-radio-group",
  "v-range-slider",
  "v-rating",
  "v-responsive",
  "v-row",
  "v-scale-transition",
  "v-scroll-x-reverse-transition",
  "v-scroll-x-transition",
  "v-scroll-y-reverse-transition",
  "v-scroll-y-transition",
  "v-select",
  "v-selection-control",
  "v-selection-control-group",
  "v-sheet",
  "v-skeleton-loader",
  "v-slide-group",
  "v-slide-group-item",
  "v-slider",
  "v-slide-x-reverse-transition",
  "v-slide-x-transition",
  "v-slide-y-reverse-transition",
  "v-slide-y-transition",
  "v-snackbar",
  "v-snackbar-queue",
  "v-spacer",
  "v-sparkline",
  "v-speed-dial",
  "v-stepper",
  "v-stepper-actions",
  "v-stepper-header",
  "v-stepper-item",
  "v-stepper-vertical",
  "v-stepper-vertical-actions",
  "v-stepper-vertical-item",
  "v-stepper-window",
  "v-stepper-window-item",
  "v-svg-icon",
  "v-switch",
  "v-system-bar",
  "v-tab",
  "v-table",
  "v-tabs",
  "v-tabs-window",
  "v-tabs-window-item",
  "v-textarea",
  "v-text-field",
  "v-theme-provider",
  "v-timeline",
  "v-timeline-item",
  "v-time-picker",
  "v-time-picker-clock",
  "v-time-picker-controls",
  "v-toolbar",
  "v-toolbar-items",
  "v-toolbar-title",
  "v-tooltip",
  "v-treeview",
  "v-treeview-group",
  "v-treeview-item",
  "v-validation",
  "v-virtual-scroll",
  "v-window",
  "v-window-item",
];

export const kebabToCamel = (str: string) => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};
export const kebabToPascal = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export interface LayerInfo {
  id?: string;
  isVuetifyComponent?: boolean;
  tagName: string;
  figmaLayerName: string;
  className?: string;
  textContent?: {
    text: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    textTransform: string;
    textAlign: string;
    color: string;
  };
  styles?: {
    position: string;
    x: string;
    y: string;
    display: string;
    margin: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    marginBottom: string;
    padding: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
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
    borderWidth: string;
    borderColor: string;
    borderStyle: string;
    borderRadius: string;
    background: string;
    backgroundColor: string;
    color: string;
    boxShadow: string;
    zIndex: string;
  };
  children: LayerInfo[];
}
