<script setup lang="ts" generic="T">
import { ref, computed } from "vue";

interface Props {
  componentProps: Record<string, { default?: string | undefined }>;
  definitionsProps: Record<string, { howUse: string; values: unknown[] }>;
  ignoreProps?: string[];
  initialPropsToShow?: string[];
}

const props = defineProps<Props>();

const numColumns = ref(2);
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
            <VTextField v-model="search" label="Search" />
          </template>
          <template #default="{ items }">
            <VExpansionPanels variant="accordion" multiple>
              <VExpansionPanel
                v-for="item in items"
                :key="item.raw.name"
                :readonly="!item.raw.supported"
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
                        <span>{{
                          item.raw.supported ? "Is supported" : "Not supported"
                        }}</span>
                      </VTooltip>
                    </div>

                    <div class="d-flex align-end flex-column justify-center me-2">
                      <VSwitch
                        v-model="propsShowInPlayground"
                        :value="item.raw.key"
                        color="primary"
                        size="small"
                        hide-details
                        @click.stop
                      />
                      <small class="ms-2 text-medium-emphasis">Show in playground</small>
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
              :length="componentPropsList.length"
              :model-value="paginationProps.page"
              show-first-last-page
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
                v-model="applyTheme"
                label="Aplicar tema"
                hint="Aplicar el tema seleccionado al wrapper de los componentes"
                color="success"
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

        <!-- Combinaciones paginadas -->
         <h6 v-if="paginatedCombinations.length > 0" class="text-h6">Playground</h6>
         <VSheet v-if="paginatedCombinations.length > 0" dense :border="'sm'" rounded="lg">
           <VRow dense>
             <template v-for="(combination, i) in paginatedCombinations" :key="i">
               <VCol :cols="numColumns">
                 <VMenu open-on-hover>
                   <template #activator="{ props: menuBtnProps }">
                     <!-- Slot para el componente específico -->
                     <VSheet
                       v-bind="menuBtnProps"
                       class="d-flex justify-center align-center pa-2 rounded-lg"
                       :theme="
                         applyTheme
                           ? (combination.props.theme as string)
                           : undefined
                       "
                       :border="applyBorder ? 'sm' : undefined"
                     >
                       <slot name="component" :combination="combination" />
                     </VSheet>
                   </template>
                   <VList>
                     <VListItem :title="combination.label" />
                   </VList>
                 </VMenu>
               </VCol>
             </template>
           </VRow>
         </VSheet>

        <!-- Mensaje cuando no hay combinaciones -->
        <VRow v-else>
          <VCol cols="12">
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
