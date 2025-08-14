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
      :initial-props-to-show="['length']"
      :initial-num-columns="12"
      :wrapper-v-app="wrapperVApp"
    >
      <template #component="{ combination }">
        <component :is="ComponentName" v-bind="{ ...combination.props }">
          <VAvatar text="JC" variant="elevated" />
          <!-- <template #default></template> -->
          <!-- <template #top>
            <div>
              Este es contenido que ira en el slot #top, por parte de Vueitfy no
              se hace nada mas con este slot.
            </div>
          </template>

          <template #colgroup>
            <div>#colgroup</div>
          </template>
          <template #body>
            <div>#body</div>
          </template>
          <template #tbody>
            <div>#tbody</div>
          </template>
          <template #thead>
            <div>#thead</div>
          </template>
          <template #tfoot>
            <div>#tfoot</div>
          </template>
          <template #[`body.prepend`]>
            <div>#[`body.prepend`]</div>
          </template>
          <template #[`body.append`]>
            <div>#[`body.append`]</div>
          </template>
          <template #[`footer.prepend`]>
            <div>
              Este slot #[`footer.prepend`], solo lo usa el VDataTableFooter
            </div>
          </template> -->

          <!-- <template #bottom>
            <div>
              Este contenido es el #bottom, va justo debajo del slot #default,
              si se define este slot, se ignora el contenido por defecto de la
              tabla para esta parte
            </div>
          </template> -->

          <!-- <template #actions>
            <VBtn text="button" />
            <VBtn text="button" />
            <VBtn text="button" />
            <VBtn text="button" />
            <VBtn text="button" />
          </template> -->
        </component>
      </template>
    </ComponentPlayground>
  </div>
</template>
