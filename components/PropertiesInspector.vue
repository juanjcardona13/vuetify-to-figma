<script setup lang="ts">
defineProps<{
  combination: Record<string, unknown>;
}>();
</script>

<template>
  <VContainer class="elevation-1">
    <VRow>
      <VCol cols="12">
        <h3 class="text-primary mb-2">Propiedades</h3>
        <div>
          <template v-for="(value, key) of combination.label" :key="key">
            <div class="d-flex align-center">
              <strong>{{ key }}&nbsp;=&nbsp;</strong>
              <span>{{ value }}</span>
            </div>
          </template>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>
