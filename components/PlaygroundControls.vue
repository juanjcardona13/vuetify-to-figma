<script setup lang="ts">
defineProps<{
  totalItems: number;
  totalPages: number;
  paginatedCombinations: Array<Record<string, unknown>>;
}>();

const currentPage = inject("currentPage", ref(1));
const itemsPerPage = inject("itemsPerPage", ref(12));
const numColumns = inject("numColumns", ref(2));
const applyBorder = inject("applyBorder", ref(false));
</script>

<template>
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
</template>
