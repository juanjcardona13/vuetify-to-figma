<script setup lang="ts">
const { ComponentName } = useRoute().params as { ComponentName: string };

const inst = getCurrentInstance()!;

console.log(inst.appContext.components);

const compDef = computed(
  () => inst.appContext.components[ComponentName] ?? null
);

function normalizeProps(
  p: Record<string, { default?: string | undefined }>
): Record<string, { default?: string | undefined }> {
  if (!p) return {};
  if (Array.isArray(p))
    return Object.fromEntries(p.map((k: string) => [k, {}]));
  return p;
}

const propsSchema = computed<Record<
  string,
  { default?: string | undefined }
> | null>(() =>
  compDef.value && "props" in compDef.value
    ? normalizeProps(compDef.value.props)
    : null
);
</script>

<template>
  <div>
    <h1>{{ ComponentName }}</h1>

    <ComponentPlayground
      v-if="propsSchema"
      :component-name="ComponentName"
      :component-props="propsSchema"
      :definitions-props="globalSupportedProps"
      :ignore-props="globalIgnoreProps"
      :initial-props-to-show="['text']"
    >
      <template #component="{ combination }">
        <component :is="ComponentName" v-bind="{ ...combination.props }" />
      </template>
    </ComponentPlayground>
  </div>
</template>
