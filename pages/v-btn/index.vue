<script setup lang="ts">
import type { VBtnSlots } from "vuetify/lib/components/VBtn/VBtn.mjs";
import { VBtn } from "vuetify/components/VBtn";

const slots: Array<keyof VBtnSlots> = [
  "append",
  "default",
  "prepend",
  "loader",
];
console.log(slots);

const ignoreProps = [
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
];
const search = ref("");
const propsShowInPlayground = ref<string[]>(["text"]);
const props: Array<ComponentProps> = [];

const currentPage = ref(1);
const itemsPerPage = 100;

const definitionsProps: Record<string, { howUse: string; values: unknown[] }> =
  {
    active: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'State' and then select 'active'",
      values: [true, false],
    },
    border: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Border Width' and then select the value you want to use",
      values: ["0", undefined, "xs", "sm", "md", "lg", "xl"],
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
    },
    disabled: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'State' and then select 'disabled'",
      values: [true, false],
    },
    elevation: {
      howUse:
        "In 'Effects' select 'Elevation' and then select the value you want to use",
      values: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24,
      ],
    },
    icon: {
      howUse:
        "First active property 'Show icon' and then select the icon you want to use",
      values: ["$vuetify"],
    },
    loading: {
      howUse: "In direct properties, search for 'loading'",
      values: [true, false],
    },
    text: {
      howUse:
        "In direct properties, search for 'text' and write the value you want to use",
      values: ["button"],
    },
    height: {
      howUse: "Figma native",
      values: [undefined],
    },
    width: {
      howUse: "Figma native",
      values: [undefined],
    },
    maxHeight: {
      howUse: "Figma native",
      values: [undefined],
    },
    maxWidth: {
      howUse: "Figma native",
      values: [undefined],
    },
    minHeight: {
      howUse: "Figma native",
      values: [undefined],
    },
    minWidth: {
      howUse: "Figma native",
      values: [undefined],
    },
    position: {
      howUse: "Figma native, partially supported.",
      values: [undefined],
    },
    appendIcon: {
      howUse: "",
      values: ["$vuetify"],
    },
    rounded: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Border Radius' and then select the value you want to use",
      values: [undefined, "0", "sm", "lg", "xl", "pill"],
    },
    size: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Size' and then select the value you want to use",
      values: ["default", "x-small", "small", "large", "x-large"],
    },
    stacked: {
      howUse: "In direct properties, search for 'stacked'",
      values: [true, false],
    },
    theme: {
      howUse:
        "In 'Appearance' click in 'Apply variable mode' select 'Theme' and then select the value you want to use",
      values: ["dark", "light"],
    },
    tile: {
      howUse: "Figma native",
      values: [true, false],
    },
    variant: {
      howUse:
        "In direct properties, search for 'variant' and select the value you want to use",
      values: ["elevated", "flat", "outlined", "tonal", "text", "plain"],
    },
    prependIcon: {
      howUse: "",
      values: ["$vuetify"],
    },
  };

const supportedProps = Object.keys(definitionsProps);


for (const prop in VBtn.props) {
  if (!ignoreProps.includes(prop)) {
    props.push({
      name: toCapitalize(prop),
      key: prop,
      default: VBtn.props[prop].default,
      supported: supportedProps.includes(prop),
      figmaType: undefined,
    });
  }
}

const allCombinations = computed(() => generateCombinations(propsShowInPlayground.value, definitionsProps));
const totalItems = computed(() => allCombinations.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
const paginatedCombinations = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allCombinations.value.slice(startIndex, endIndex);
});

watch(propsShowInPlayground, () => {
  currentPage.value = 1;
});
</script>

<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="3">
        <span class="text-subtitle-1"> Props </span>
        <VDataIterator
          :items="props"
          :search="search"
          :sort-by="[{ key: 'name', order: 'asc' }]"
          :page="currentPage"
        >
          <template #header>
            <VTextField v-model="search" label="Search" />
          </template>
          <template #default="{ items }">
            <VRow>
              <VCol v-for="item in items" :key="item.raw.name" cols="12">
                <VCard :elevation="0" :border="'sm'">
                  <VCardText>
                    <b>Name:</b> {{ item.raw.name }}
                    <br />
                    <b>Is supported:</b>
                    <span v-if="item.raw.supported"> ✅ </span>
                    <span v-else> ❌ </span>
                    <template v-if="item.raw.supported">
                      <br />
                      <b>How to use:</b>
                      <span v-if="definitionsProps[item.raw.key]">
                        {{ definitionsProps[item.raw.key].howUse }}
                      </span>
                      <span v-else> ❌ </span>
                      <br />
                      <b>Show in playground:</b>
                      <VSwitch
                        v-model="propsShowInPlayground"
                        :value="item.raw.key"
                        color="primary"
                        hide-details
                      />
                    </template>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </template>
          <template #footer="paginationProps">
            <VPagination
              :length="paginationProps.items.length"
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
          <VCol v-if="totalPages > 1" cols="6" class="d-flex justify-center align-center border">
            <VPagination
            v-model="currentPage"
              :length="totalPages"
              show-first-last-page
              :total-visible="3"
            />
          </VCol>

        </VRow>

        <!-- Combinaciones paginadas -->
        <VRow v-if="paginatedCombinations.length > 0" dense>
          <template v-for="(combination, i) in paginatedCombinations" :key="i">
            <VCol cols="2">
              <VMenu open-on-hover>
                <template #activator="{ props: btnProps }">
                  <VBtn v-bind="{ ...btnProps, ...combination.props }" />
                </template>
                <VList>
                  <VListItem :title="combination.label" />
                </VList>
              </VMenu>
            </VCol>
          </template>
        </VRow>

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
