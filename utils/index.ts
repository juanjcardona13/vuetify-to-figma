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

/** La lista de abajo modifica logica y comportamiento de los componentes */
// Ignorados
/** La lista de abajo modifica como se ve el componente */
// Soportados => Todo que modifica el diseño
// No soportados =>

export type GlobalSupportedProps = Record<
  string,
  {
    howUse: string;
    values: unknown[];
    type: "boolean" | "freeValues" | "fixedValues";
  }
>;

export const globalIgnoreProps = [
  "continuous",
  "mandatory",
  "reverse",
  "touch",
  "activator",
  "justify",
  "autoGrow",
  "counterValue",
  "persistentClear",
  "persistentCounter",
  "persistentHint",
  "persistentPlaceholder",
  "validationValue",
  "closeDelay",
  "closeOnBack",
  "closeOnContentClick",
  "locationStrategy",
  "noClickAnimation",
  "openOnClick",
  "openOnFocus",
  "openOnHover",
  "expandOnClick",
  "OnClick:appendInner",
  "OnClick:clear",
  "onClick:append",
  "onClick:appendInner",
  "onClick:clear",
  "onClick:prepend",
  "onClick:prependInner",
  "onUpdate:focused",
  "validateOn",
  "noResize",
  "modelModifiers",
  "maxRows",
  "rules",
  "rows",
  "id",
  "_as",
  "tag",
  "style",
  "class",
  "exact",
  "href",
  "location",
  "readonly",
  "replace",
  "ripple",
  "selectedClass",
  "symbol",
  "to",
  "value",
  "closeLabel",
  "iconSizes",
  "modelValue",
  "position",
  "absolute",
  "floating",
  "name",
  "order",
  "scrollBehavior",
  "scrollTarget",
  "scrollThreshold",
  "activeColor",
  "baseColor",
  "autofocus",
  "autoSelectFirst",
  "bgColor",
  "customFilter",
  "customKeyFilter",
  "eager",
  "filterKeys",
  "filterMode",
  "itemChildren",
  "itemProps",
  "itemType",
  "itemValue",
  "listProps",
  "menuProps",
  "noAutoScroll",
  "noFilter",
  "openOnClear",
  "returnObject",
  "reverse",
  "role",
  "rules",
  "transition",
  "valueComparator",
  "activatorProps",
  "activeClass",
];

export const globalSupportedProps: GlobalSupportedProps = {
  active: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'State' and then select 'active'",
    values: [true, false],
    type: "boolean",
  },
  border: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'Border Width' and then select the value you want to use",
    values: [
      "0",
      undefined,
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "top",
      "end",
      "bottom",
      "start",
    ], // TODO: Para el VAlert, solo funcionan los ultimos 4 valores, mirar como se los mostramos al usuario
    type: "fixedValues",
  },
  color: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'Color' and then select the value you want to use",
    values: [
      "default",
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
    ],
    type: "fixedValues",
  },
  disabled: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'State' and then select 'disabled'",
    values: [true, false],
    type: "boolean",
  },
  elevation: {
    howUse:
      "In 'Effects' select 'Elevation' and then select the value you want to use",
    values: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24,
    ],
    type: "fixedValues",
  },
  icon: {
    howUse:
      "First active property 'Show icon' and then select the icon you want to use",
    values: ["$vuetify", false],
    type: "freeValues",
  },
  loading: {
    howUse: "In direct properties, search for 'loading'",
    values: [true, false],
    type: "boolean",
  },
  text: {
    howUse:
      "In direct properties, search for 'text' and write the value you want to use",
    values: ["button"],
    type: "freeValues",
  },
  label: {
    howUse:
      "In direct properties, search for 'label' and write the value you want to use",
    values: ["Label"],
    type: "freeValues",
  },
  title: {
    howUse:
      "In direct properties, search for 'title' and write the value you want to use",
    values: ["Title"],
    type: "freeValues",
  },
  type: {
    howUse:
      "In direct properties, search for 'type' and select the value you want to use",
    values: ["success", "error", "warning", "info"],
    type: "fixedValues",
  },
  height: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  width: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  maxHeight: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  maxWidth: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  minHeight: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  minWidth: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  appendIcon: {
    howUse: "",
    values: ["$vuetify"],
    type: "freeValues",
  },
  rounded: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'Border Radius' and then select the value you want to use",
    values: [undefined, "0", "sm", "lg", "xl", "pill"],
    type: "fixedValues",
  },
  size: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'Size' and then select the value you want to use",
    values: ["x-small", "small", "default", "large", "x-large"],
    type: "fixedValues",
  },
  density: {
    howUse: "In direct properties, search for 'density'",
    values: ["compact", "comfortable", "default"],
    type: "fixedValues",
  },
  stacked: {
    howUse: "In direct properties, search for 'stacked'",
    values: [true, false],
    type: "boolean",
  },
  theme: {
    howUse:
      "In 'Appearance' click in 'Apply variable mode' select 'Theme' and then select the value you want to use",
    values: ["dark", "light"],
    type: "fixedValues",
  },
  tile: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  variant: {
    howUse:
      "In direct properties, search for 'variant' and select the value you want to use",
    values: ["elevated", "flat", "tonal", "outlined", "text", "plain"],
    type: "fixedValues",
  },
  prependIcon: {
    howUse: "",
    values: ["$vuetify"],
    type: "freeValues",
  },
  borderColor: {
    howUse: "",
    values: [
      "default",
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
    ],
    type: "fixedValues",
  },
  closable: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  closeIcon: {
    howUse: "",
    values: ["$close"],
    type: "freeValues",
  },
  closeLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  iconSize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  iconSizes: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  location: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  modelValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  position: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  prominent: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  tag: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fullHeight: {
    howUse: "Figma native",
    values: [undefined],
    type: "fixedValues",
  },
  overlaps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  absolute: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  collapse: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  extended: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  extensionHeight: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  flat: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  floating: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  image: {
    howUse: "",
    values: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    type: "freeValues",
  },
  name: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  order: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scrollBehavior: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scrollTarget: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scrollThreshold: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activeColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  baseColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  block: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  exact: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  href: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  readonly: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  replace: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  ripple: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  selectedClass: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  slim: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  symbol: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  to: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  value: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autoSelectFirst: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autofocus: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  bgColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  centerAffix: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  chips: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  clearIcon: {
    howUse: "",
    values: ["$close"],
    type: "freeValues",
  },
  clearOnSelect: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  clearable: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  closableChips: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  closeText: {
    howUse: "",
    values: ["closeText"],
    type: "freeValues",
  },
  counter: {
    howUse: "",
    values: [true, false, 10],
    type: "freeValues",
  },
  counterValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  customFilter: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  customKeyFilter: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  details: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  direction: {
    howUse: "",
    values: ["horizontal", "vertical"],
    type: "fixedValues",
  },
  eager: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  error: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  errorMessages: {
    howUse: "",
    values: [undefined, "Error message 1", "Error message 2"],
    type: "freeValues",
  },
  filterKeys: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  filterMode: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  focused: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  glow: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  hideDetails: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  hideNoData: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  hideSelected: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  hideSpinButtons: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  hint: {
    howUse: "",
    values: [undefined, "Hint text"],
    type: "freeValues",
  },
  iconColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  id: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemChildren: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  itemProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemTitle: {
    howUse: "",
    values: ["Item Title"],
    type: "freeValues",
  },
  itemType: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  items: {
    howUse: "",
    values: [undefined, "Item 1", "Item 2"],
    type: "freeValues",
  },
  listProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  maxErrors: {
    howUse: "",
    values: [undefined, 1, 2, 3],
    type: "freeValues",
  },
  menu: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  menuIcon: {
    howUse: "",
    values: ["$dropdown"],
    type: "freeValues",
  },
  menuProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  messages: {
    howUse: "",
    values: [undefined, "Message 1", "Message 2"],
    type: "freeValues",
  },
  modelModifiers: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  multiple: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  noAutoScroll: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  noDataText: {
    howUse: "",
    values: ["No data text"],
    type: "freeValues",
  },
  noFilter: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  openOnClear: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  openText: {
    howUse: "",
    values: ["Open Text"],
    type: "freeValues",
  },
  persistentClear: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  persistentCounter: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  persistentHint: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  persistentPlaceholder: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  placeholder: {
    howUse: "",
    values: [undefined, "Placeholder text"],
    type: "freeValues",
  },
  prefix: {
    howUse: "",
    values: [undefined, "$"],
    type: "freeValues",
  },
  prependInnerIcon: {
    howUse: "",
    values: ["$vuetify"],
    type: "freeValues",
  },
  returnObject: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  reverse: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  role: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rules: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  search: {
    howUse: "",
    values: ["Search"],
    type: "freeValues",
  },
  singleLine: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  suffix: {
    howUse: "",
    values: [undefined, ".00"],
    type: "freeValues",
  },
  transition: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  validateOn: {
    howUse: "",
    values: [
      "eager",
      "lazy",
      "blur",
      "input",
      "submit",
      "invalid-input",
      "blur lazy",
      "input lazy",
      "submit lazy",
      "invalid-input lazy",
      "blur eager",
      "input eager",
      "submit eager",
      "invalid-input eager",
      "lazy blur",
      "lazy input",
      "lazy submit",
      "lazy invalid-input",
      "eager blur",
      "eager input",
      "eager submit",
      "eager invalid-input",
    ],
    type: "fixedValues",
  },
  valueComparator: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  end: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  start: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  bordered: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  content: {
    howUse: "",
    values: ["text", 0],
    type: "freeValues",
  },
  dot: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  inline: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  max: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  offsetX: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  offsetY: {
    howUse: "Figma native",
    values: [undefined],
    type: "freeValues",
  },
  textColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  avatar: {
    howUse: "",
    values: ["https://cdn.vuetifyjs.com/images/parallax/material.jpg"],
    type: "freeValues",
  },
  lines: {
    howUse: "",
    values: ["one", "two", "three"],
    type: "fixedValues",
  },
  mobile: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  mobileBreakpoint: {
    howUse: "",
    values: [undefined, "0", "xs", "sm", "md", "lg", "xl", "xxl"],
    type: "freeValues",
  },
  sticky: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  grow: {
    howUse: "Figma native",
    values: [true, false],
    type: "boolean",
  },
  mandatory: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  mode: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activator: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activatorProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  attach: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  closeDelay: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  closeOnBack: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  closeOnContentClick: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  contained: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  contentClass: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  contentProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fullscreen: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  inset: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  locationStrategy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  noClickAnimation: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  offset: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  opacity: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  openDelay: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  openOnClick: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  openOnFocus: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  openOnHover: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  origin: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  persistent: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  retainFocus: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scrim: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scrollStrategy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scrollable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  target: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  zIndex: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activeClass: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  divider: {
    howUse: "",
    values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    type: "freeValues",
  },
  divided: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedDates: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  day: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  dayIndex: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  displayValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  events: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  firstDayOfWeek: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideDayHeader: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideHeader: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideWeekNumber: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  intervalDivisions: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  intervalDuration: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  intervalFormat: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  intervalHeight: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  intervalStart: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  intervals: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  min: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  month: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  nextIcon: {
    howUse: "",
    values: ["$next"],
    type: "freeValues",
  },
  prevIcon: {
    howUse: "",
    values: ["$prev"],
    type: "freeValues",
  },
  showAdjacentMonths: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  viewMode: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  weekdayFormat: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  weekdays: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  weeksInMonth: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  year: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  index: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allDay: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  event: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  interval: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  appendAvatar: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hover: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  link: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  prependAvatar: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  subtitle: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  continuous: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  cycle: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  delimiterIcon: {
    howUse: "",
    values: ["$delimiter"],
    type: "freeValues",
  },
  hideDelimiterBackground: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideDelimiters: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  progress: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showArrows: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  touch: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  verticalArrows: {
    howUse: "",
    values: [true, false, "left", "right"],
    type: "fixedValues",
  },
  verticalDelimiters: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alt: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  aspectRatio: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  cover: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  crossorigin: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  draggable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  gradient: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  lazySrc: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  options: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  referrerpolicy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  reverseTransition: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  sizes: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  src: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  srcset: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  defaultsTarget: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  falseIcon: {
    howUse: "",
    values: ["$checkboxOff"],
    type: "freeValues",
  },
  falseValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  indeterminate: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  indeterminateIcon: {
    howUse: "",
    values: ["$checkboxIndeterminate"],
    type: "freeValues",
  },
  trueIcon: {
    howUse: "",
    values: ["$checkboxOn"],
    type: "freeValues",
  },
  trueValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  validationValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  filter: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  filterIcon: {
    howUse: "",
    values: ["$complete"],
    type: "freeValues",
  },
  pill: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  centerActive: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  column: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignSelf: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  cols: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  lg: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  md: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  offsetLg: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  offsetMd: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  offsetSm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  offsetXl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  offsetXxl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  orderLg: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  orderMd: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  orderSm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  orderXl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  orderXxl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  sm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  xl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  xxl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  appendInnerIcon: {
    howUse: "",
    values: ["$vuetify"],
    type: "freeValues",
  },
  cancelText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  canvasHeight: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  dirty: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  dotSize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideActions: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideCanvas: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideInputs: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideSliders: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  landscape: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  modes: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  okText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pip: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pipIcon: {
    howUse: "",
    values: ["$color"],
    type: "freeValues",
  },
  showSwatches: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  swatches: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  swatchesMaxHeight: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  delimiters: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fluid: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  customKeySort: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  expandOnClick: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  expanded: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  groupBy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemSelectable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemsPerPage: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  multiSort: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  mustSort: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  page: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  selectStrategy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showExpand: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  showSelect: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  sortBy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  cellProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  disableSort: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  firstIcon: {
    howUse: "",
    values: ["$first"],
    type: "freeValues",
  },
  firstPageLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fixedFooter: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fixedHeader: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  headerProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  headers: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideDefaultBody: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideDefaultFooter: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideDefaultHeader: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemsPerPageOptions: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemsPerPageText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  lastIcon: {
    howUse: "",
    values: ["$last"],
    type: "freeValues",
  },
  lastPageLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  loadingText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  nextPageLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pageText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  prevPageLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rowProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showCurrentPage: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  sortAscIcon: {
    howUse: "",
    values: ["$sortAsc"],
    type: "freeValues",
  },
  sortDescIcon: {
    howUse: "",
    values: ["$sortDesc"],
    type: "freeValues",
  },
  striped: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  item: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemsLength: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemHeight: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemKey: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedMonths: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedYears: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  controlHeight: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  displayFormat: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  header: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  headerColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  hideWeekdays: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  inputFormat: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  modeIcon: {
    howUse: "",
    values: ["$subgroup"],
    type: "freeValues",
  },
  showWeek: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  updateOn: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  defaults: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  reset: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  root: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scoped: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  group: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideOnLeave: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  leaveAbsolute: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  length: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  thickness: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  vertical: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  actionText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  headline: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  justify: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  textWidth: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  collapseIcon: {
    howUse: "",
    values: ["$collapse"],
    type: "freeValues",
  },
  expandIcon: {
    howUse: "",
    values: ["$expand"],
    type: "freeValues",
  },
  focusable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  static: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  app: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  appear: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  layout: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  counterSizeString: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  counterString: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideInput: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showSize: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  browseText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  dividerText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideBrowse: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  file: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fileIcon: {
    howUse: "",
    values: ["mdi-file-document"],
    type: "freeValues",
  },
  nav: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fastFail: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  displayMode: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  keyMap: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  keys: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  platform: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activeIcon: {
    howUse: "",
    values: ["$vuetify"],
    type: "freeValues",
  },
  activeVariant: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  baseVariant: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideOverlay: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rotate: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  emptyText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  loadMoreText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  margin: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  side: {
    howUse: "",
    values: ["start", "end"],
    type: "fixedValues",
  },
  activatable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activated: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  activeStrategy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  filterable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  openStrategy: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  opened: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  selectable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  selected: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rawId: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  subgroup: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fallbackLocale: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  locale: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rtl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  mask: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  returnMaskedValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  disableInitialFocus: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  submenu: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  disableResizeWatcher: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  disableRouteWatcher: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  expandOnHover: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  permanent: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rail: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  railWidth: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  temporary: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  touchless: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  controlVariant: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  decimalSeparator: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  minFractionDigits: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  precision: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  step: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  focusAll: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  ariaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  currentPageAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  ellipsis: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  firstAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  lastAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  nextAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pageAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  previousAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showFirstLastPage: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  totalVisible: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  scale: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  animation: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  gap: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  gaugeCut: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideSlice: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hoverScale: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  innerCut: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  legend: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  palette: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  reveal: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  tooltip: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pattern: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  subtitleFormat: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  titleFormat: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  bgOpacity: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  bufferColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  bufferOpacity: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  bufferValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  clickable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  roundedBar: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  stream: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pullDownThreshold: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  noKeyboard: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showTicks: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  strict: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  thumbColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  thumbLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  thumbSize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  tickSize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  ticks: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  trackColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  trackFillColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  trackSize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  emptyIcon: {
    howUse: "",
    values: ["$ratingEmpty"],
    type: "freeValues",
  },
  fullIcon: {
    howUse: "",
    values: ["$ratingFull"],
    type: "freeValues",
  },
  halfIncrements: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemAriaLabel: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemLabelPosition: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  itemLabels: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  align: {
    howUse: "",
    values: ["start", "center"],
    type: "fixedValues",
  },
  alignContent: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignContentLg: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignContentMd: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignContentSm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignContentXl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignContentXxl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignLg: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignMd: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignSm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignXl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  alignXxl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  dense: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  justifyLg: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  justifyMd: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  justifySm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  justifyXl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  justifyXxl: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  noGutters: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  boilerplate: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  multiLine: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  timeout: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  timer: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autoDraw: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autoDrawDuration: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autoDrawEasing: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autoLineWidth: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fill: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  gradientDirection: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  labelSize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  labels: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  lineWidth: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  padding: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  showLabels: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  smooth: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  altLabels: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  completeIcon: {
    howUse: "",
    values: ["$complete"],
    type: "freeValues",
  },
  editIcon: {
    howUse: "",
    values: ["$edit"],
    type: "freeValues",
  },
  editable: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  errorIcon: {
    howUse: "",
    values: ["$error"],
    type: "freeValues",
  },
  nextText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  nonLinear: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  prevText: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  complete: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  window: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fixed: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideSlider: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  sliderColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  alignTabs: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  fixedTabs: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  autoGrow: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  maxRows: {
    howUse: "",
    values: [undefined, 1, 2, 3],
    type: "freeValues",
  },
  noResize: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  rows: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  withBackground: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedHours: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedMinutes: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedSeconds: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  format: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  useSeconds: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  allowedValues: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  ampm: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  displayedValue: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  double: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hour: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  minute: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  period: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  second: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  dotColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  fillDot: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  hideOpposite: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  lineColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  lineInset: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  lineThickness: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  truncateLine: {
    howUse: "",
    values: ["end", "start", "both"],
    type: "fixedValues",
  },
  hideDot: {
    howUse: "",
    values: [true, false],
    type: "boolean",
  },
  interactive: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  indentLines: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  loadChildren: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  loadingIcon: {
    howUse: "",
    values: ["$loading"],
    type: "freeValues",
  },
  openAll: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  selectedColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  separateRoots: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  toggleIcon: {
    howUse: "",
    values: ["$vuetify"],
    type: "freeValues",
  },
  autoplay: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  backgroundColor: {
    howUse: "",
    values: ["primary", "secondary", "success", "info", "warning", "error"],
    type: "fixedValues",
  },
  controlsProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  controlsTransition: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  controlsVariant: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  detached: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  duration: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideFullscreen: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hidePlay: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  hideVolume: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  muted: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  noFullscreen: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  pills: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  playing: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  splitTime: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  startAt: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  volume: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  volumeProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  sliderProps: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
  renderless: {
    howUse: "",
    values: [undefined],
    type: "fixedValues",
  },
};
