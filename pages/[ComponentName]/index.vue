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

const wrapperVApp = computed(() => {
  return [
    "v-app",
    "v-app-bar",
    "v-container",
    "v-footer",
    "v-main",
    "VAppBar",
    "VContainer",
    "VFooter",
    "VNavigationDrawer",
    "VFooter",
    "VMain",
  ].includes(ComponentName);
});

console.log("==============>", propsSchema.value);
</script>

<template>
  <div>
    <NuxtLink to="/">
      <h1>{{ ComponentName }}</h1>
    </NuxtLink>

    <ComponentPlayground
      v-if="propsSchema"
      :component-name="ComponentName"
      :component-props="propsSchema"
      :definitions-props="globalSupportedProps"
      :ignore-props="globalIgnoreProps"
      :initial-props-to-show="['text']"
      :initial-num-columns="7"
      :wrapper-v-app="wrapperVApp"
    >
      <template #component="{ combination }">
        <component :is="ComponentName" v-bind="{ ...combination.props }">
          <template #actions>
            <VBtn text="button" />
            <VBtn text="button" />
            <VBtn text="button" />
            <VBtn text="button" />
            <VBtn text="button" />
          </template>
        </component>
      </template>
    </ComponentPlayground>
  </div>
</template>
