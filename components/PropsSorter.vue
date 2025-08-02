<script setup lang="ts">
const propsShowInPlayground = inject(
  "propsShowInPlayground",
  ref<string[]>([])
);

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
</script>

<template>
  <div>
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
  </div>
</template>
