<script setup lang="ts">

defineProps<{
  componentPropsList: Array<{
    name: string;
    supported: boolean;
    key: string;
  }>;
  definitionsProps: Record<string, { howUse: string; values: unknown[] }>;
}>();


const search = inject('search', ref(''))
const applyTheme = inject('applyTheme', ref(true))
const propsShowInPlayground = inject('propsShowInPlayground', ref<string[]>([]))
const selectedValuesByProp = inject('selectedValuesByProp', ref<Record<string, unknown[]>>({}))

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
  <div>
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
                        item.raw.supported ? "Is supported" : "Not supported"
                      }}
                    </span>
                  </VTooltip>
                </div>

                <div class="d-flex align-end flex-column justify-center me-2">
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
                        (values) => updateSelectedValues(item.raw.key, values)
                      "
                    >
                      <VChip
                        v-for="(value, index) in definitionsProps[item.raw.key]
                          .values"
                        :key="index"
                        :value="value"
                        variant="outlined"
                        filter
                        size="small"
                      >
                        {{ value === undefined ? "undefined" : String(value) }}
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
          {{ (paginationProps.page - 1) * paginationProps.itemsPerPage + 1 }}
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
  </div>
</template>
