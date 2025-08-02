<script setup lang="ts" generic="T">
import { ref, computed } from "vue";

interface Props {
  componentProps: Record<string, { default?: string | undefined }>;
  definitionsProps: Record<string, { howUse: string; values: unknown[] }>;
  ignoreProps?: string[];
  initialPropsToShow?: string[];
  initialNumColumns?: number;
}

const props = defineProps<Props>();

const numColumns = ref(props.initialNumColumns || 2);
const applyTheme = ref(true);
const applyBorder = ref(false);

// Estado reactivo para almacenar los valores seleccionados por prop
const selectedValuesByProp = ref<Record<string, unknown[]>>({});

const {
  search,
  propsShowInPlayground,
  currentPage,
  itemsPerPage,
  props: componentPropsList,
  definitionsProps,
  totalItems,
  totalPages,
  paginatedCombinations,
} = useComponentPlayground(
  props.componentProps,
  props.definitionsProps,
  props.ignoreProps || [],
  props.initialPropsToShow || [],
  computed(() => selectedValuesByProp.value)
);

// Función para obtener los valores seleccionados de un prop
const getSelectedValues = (propKey: string): unknown[] => {
  return selectedValuesByProp.value[propKey] || [];
};

// Función para actualizar los valores seleccionados de un prop
const updateSelectedValues = (propKey: string, values: unknown[]): void => {
  selectedValuesByProp.value[propKey] = values;
};

function movePropUp(index: number) {
  if (index > 0) {
    const temp = propsShowInPlayground.value[index - 1];
    propsShowInPlayground.value[index - 1] = propsShowInPlayground.value[index];
    propsShowInPlayground.value[index] = temp;
  }
}

function movePropDown(index: number) {
  if (index < propsShowInPlayground.value.length - 1) {
    const temp = propsShowInPlayground.value[index + 1];
    propsShowInPlayground.value[index + 1] = propsShowInPlayground.value[index];
    propsShowInPlayground.value[index] = temp;
  }
}

const bgColorPlayground = ref("#ffffff");
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
      textContent: el.textContent?.trim() || '',
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
      attributes: Array.from(el.attributes).map(attr => ({
        name: attr.name,
        value: attr.value
      })),
      children: []
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
    'div': 'mdi-square-outline',
    'span': 'mdi-text',
    'p': 'mdi-text',
    'button': 'mdi-gesture-tap-button',
    'input': 'mdi-form-textbox',
    'img': 'mdi-image',
    'svg': 'mdi-vector-polyline',
    'path': 'mdi-vector-polyline',
    'circle': 'mdi-circle-outline',
    'rect': 'mdi-square-outline',
    'a': 'mdi-link',
    'ul': 'mdi-format-list-bulleted',
    'li': 'mdi-format-list-numbered',
    'table': 'mdi-table',
    'tr': 'mdi-table-row',
    'td': 'mdi-table-cell',
    'th': 'mdi-table-headers-eye',
    'form': 'mdi-form-select',
    'label': 'mdi-label',
    'textarea': 'mdi-form-textarea',
    'select': 'mdi-form-dropdown',
    'option': 'mdi-menu-down',
    'h1': 'mdi-format-header-1',
    'h2': 'mdi-format-header-2',
    'h3': 'mdi-format-header-3',
    'h4': 'mdi-format-header-4',
    'h5': 'mdi-format-header-5',
    'h6': 'mdi-format-header-6',
  };
  
  return iconMap[tagName] || 'mdi-tag';
};

// Función que se ejecuta cuando se hace clic en el tab Layers
const handleLayersTabClick = (combination: Record<string, unknown>, index: number) => {
  // Buscar el elemento del slot en el DOM usando el índice
  const slotElement = document.querySelector(`[data-combination="combination-${index}"]`);
  if (slotElement) {
    const layers = extractLayers(slotElement as HTMLElement);
    console.log('Layers extracted:', layers);
    extractedLayers.value = layers;
    return layers;
  }
  extractedLayers.value = [];
  return [];
};
</script>

<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="3">
        <span class="text-subtitle-1"> Props </span>
        <VDataIterator
          :items="componentPropsList"
          :search="search"
          :items-per-page="6"
        >
          <template #header>
            <VTextField v-model="search" label="Search" clearable />
          </template>
          <template #default="{ items }">
            <VExpansionPanels variant="accordion" multiple>
              <VExpansionPanel
                v-for="item in items"
                :key="item.raw.name"
                :readonly="!item.raw.supported"
                :collapse-icon="item.raw.supported ? '$collapse' : ''"
                :expand-icon="item.raw.supported ? '$expand' : ''"
              >
                <template #title>
                  <div class="d-flex align-center justify-space-between w-100">
                    <div class="d-flex align-center">
                      <span class="me-2">{{ item.raw.name }}</span>
                      <VTooltip location="top">
                        <template #activator="{ props: tooltipProps }">
                          <VIcon
                            v-bind="tooltipProps"
                            :icon="
                              item.raw.supported
                                ? 'mdi-check-circle'
                                : 'mdi-close-circle'
                            "
                            :color="item.raw.supported ? 'success' : 'error'"
                            size="small"
                          />
                        </template>
                        <span>
                          {{
                            item.raw.supported
                              ? "Is supported"
                              : "Not supported"
                          }}
                        </span>
                      </VTooltip>
                    </div>

                    <div
                      class="d-flex align-end flex-column justify-center me-2"
                    >
                      <div class="d-flex align-center ga-2">
                        <VSwitch
                          v-if="
                            item.raw.key === 'theme' &&
                            propsShowInPlayground.includes(item.raw.key)
                          "
                          v-model="applyTheme"
                          v-tooltip="
                            'Aplicar el tema seleccionado al wrapper de los componentes'
                          "
                          color="success"
                          hide-details
                        />
                        <VSwitch
                          v-if="item.raw.supported"
                          v-model="propsShowInPlayground"
                          :value="item.raw.key"
                          color="primary"
                          hide-details
                          @click.stop
                        />
                      </div>
                      <small
                        v-if="item.raw.supported"
                        class="ms-2 text-medium-emphasis"
                      >
                        Show in playground
                      </small>
                    </div>
                  </div>
                </template>

                <template #text>
                  <div v-if="item.raw.supported">
                    <div class="mb-4">
                      <strong>How to use:</strong>
                      <p v-if="definitionsProps[item.raw.key]" class="mt-2">
                        {{ definitionsProps[item.raw.key].howUse }}
                      </p>
                      <p v-else class="mt-2 text-error">
                        ❌ No instructions available
                      </p>
                    </div>

                    <div v-if="definitionsProps[item.raw.key]?.values">
                      <strong>Available values:</strong>
                      <div class="mt-2">
                        <VChipGroup
                          :model-value="getSelectedValues(item.raw.key)"
                          multiple
                          column
                          @update:model-value="
                            (values) =>
                              updateSelectedValues(item.raw.key, values)
                          "
                        >
                          <VChip
                            v-for="(value, index) in definitionsProps[
                              item.raw.key
                            ].values"
                            :key="index"
                            :value="value"
                            variant="outlined"
                            filter
                            size="small"
                          >
                            {{
                              value === undefined ? "undefined" : String(value)
                            }}
                          </VChip>
                        </VChipGroup>
                      </div>
                    </div>
                  </div>
                </template>
              </VExpansionPanel>
            </VExpansionPanels>
          </template>
          <template #footer="paginationProps">
            <p class="text-caption">
              Mostrando pagina: {{ paginationProps.page }} de
              {{ paginationProps.pageCount }}
            </p>
            <p class="text-caption">
              Mostrando elemento del
              {{
                (paginationProps.page - 1) * paginationProps.itemsPerPage + 1
              }}
              al {{ paginationProps.page * paginationProps.itemsPerPage }} de
              {{ componentPropsList.length }} elementos
            </p>
            <VPagination
              :length="paginationProps.pageCount"
              :model-value="paginationProps.page"
              show-first-last-page
              size="small"
              active-color="primary"
              @first="paginationProps.setPage(1)"
              @last="paginationProps.setPage(paginationProps.pageCount)"
              @next="(_value) => paginationProps.nextPage"
              @prev="(_value) => paginationProps.prevPage"
              @update:model-value="(value) => paginationProps.setPage(value)"
            />
          </template>
        </VDataIterator>
      </VCol>
      <VCol cols="9">
        <!-- Información de paginación -->
        <VRow class="mb-4">
          <VCol cols="6">
            <VCard :elevation="0" :border="'sm'">
              <VCardText>
                <span class="text-subtitle-1">
                  <strong>Total de combinaciones:</strong> {{ totalItems }}
                </span>
                <br />
                <span class="text-subtitle-2">
                  <strong>Página actual:</strong> {{ currentPage }} de
                  {{ totalPages }}
                </span>
                <br />
                <span class="text-subtitle-2">
                  <strong>Elementos mostrados:</strong>
                  {{ paginatedCombinations.length }}
                </span>

                <br />
                <span class="text-subtitle-2">
                  <strong>Elementos por página:</strong> {{ itemsPerPage }}
                </span>
              </VCardText>
            </VCard>
          </VCol>
          <!-- Componente de paginación -->
          <VCol
            v-if="totalPages > 1"
            cols="6"
            class="d-flex justify-center align-center border"
          >
            <VPagination
              v-model="currentPage"
              :length="totalPages"
              show-first-last-page
              :total-visible="3"
            />
          </VCol>

          <VCol cols="12">
            <div class="d-flex align-center justify-space-between ga-4">
              <VNumberInput
                v-model="numColumns"
                label="Número de columnas"
                hint="Número de columnas a mostrar en la grilla"
                :min="1"
                :max="12"
                persistent-hint
              />

              <VSwitch
                v-model="applyBorder"
                label="Aplicar borde"
                hint="Aplicar un border al wrapper de los componentes"
                color="success"
                persistent-hint
              />
            </div>
          </VCol>
        </VRow>

        <VRow dense>
          <VCol cols="12" class="d-flex justify-end">
            <VMenu>
              <template #activator="{ props: menuBtnProps }">
                <VBtn v-bind="menuBtnProps" icon="mdi-palette" />
              </template>
              <VSheet class="pa-2">
                <VColorPicker v-model="bgColorPlayground" />
              </VSheet>
            </VMenu>
          </VCol>
          <VCol cols="2">
            <h6 class="text-h6">Sort props</h6>

            <VList>
              <VListItem
                v-for="(prop, index) in propsShowInPlayground"
                :key="prop"
                class="px-2 mb-1"
                density="compact"
                :border="'sm'"
                :rounded="'lg'"
              >
                <div class="d-flex align-center">
                  <VBtn
                    icon="mdi-close"
                    size="x-small"
                    variant="text"
                    color="error"
                    class="me-1"
                    @click.stop="
                      propsShowInPlayground.splice(
                        propsShowInPlayground.indexOf(prop),
                        1
                      )
                    "
                  />

                  <div
                    class="me-2 w-100"
                    style="
                      word-break: break-word;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      display: inline-flex;
                    "
                  >
                    <span v-tooltip="prop">
                      {{ prop }}
                    </span>
                  </div>

                  <VBtn
                    icon="mdi-arrow-up"
                    size="16"
                    style="font-size: 12px"
                    variant="text"
                    :disabled="index === 0"
                    class="mx-1"
                    @click="movePropUp(index)"
                  />
                  <VBtn
                    icon="mdi-arrow-down"
                    size="16"
                    style="font-size: 12px"
                    variant="text"
                    :disabled="index === propsShowInPlayground.length - 1"
                    class="mx-1"
                    @click="movePropDown(index)"
                  />
                </div>
              </VListItem>
            </VList>
          </VCol>
          <!-- Combinaciones paginadas -->
          <VCol v-if="paginatedCombinations.length > 0" cols="10">
            <h6 class="text-h6 mb-2">
              Playground 
            </h6>
            <VSheet
              dense
              :border="'sm'"
              rounded="lg"
              :color="bgColorPlayground"
            >
              <VRow dense>
                <template
                  v-for="(combination, i) in paginatedCombinations"
                  :key="i"
                >
                  <VCol :cols="numColumns">
                    <VMenu open-on-hover :close-on-content-click="false">
                      <template #activator="{ props: menuBtnProps }">
                        <VSheet
                          v-bind="menuBtnProps"
                          class="d-flex justify-center align-center pa-2 rounded-lg"
                          :theme="
                            applyTheme
                              ? (combination.props.theme as string)
                              : undefined
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
                                              <span v-if="layer.className" class="text-caption text-medium-emphasis">
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
                                              <strong>Contenido:</strong> {{ layer.textContent }}
                                            </div>
                                            
                                            <div v-if="layer.id" class="mb-2">
                                              <strong>ID:</strong> {{ layer.id }}
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
                                  <VAlert 
                                    v-else 
                                    type="info" 
                                    variant="tonal"
                                    class="mt-2"
                                  >
                                    Haz clic en el tab "Layers" para extraer las capas del componente.
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
          </VCol>
          <!-- Mensaje cuando no hay combinaciones -->
          <VCol v-else cols="12">
            <VAlert type="info" variant="tonal">
              No hay combinaciones para mostrar. Selecciona al menos una
              propiedad en el panel izquierdo.
            </VAlert>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
