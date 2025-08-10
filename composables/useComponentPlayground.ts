import { computed, ref, watch } from "vue";
import type { ComputedRef } from "vue";
import { toCapitalize, generateCombinations } from "../utils/index";
import type { ComponentProps } from "../utils/index";

export function useComponentPlayground(
  componentProps: Record<string, { default?: string | undefined }>,
  definitionsProps: Record<
    string,
    {
      howUse: string;
      values: unknown[];
      type: "boolean" | "freeValues" | "fixedValues";
    }
  >,
  ignoreProps: string[] = [],
  initialPropsToShow: string[] = [],
  selectedValuesByProp: ComputedRef<Record<string, unknown[]>> = computed(
    () => ({})
  )
) {
  const search = ref("");
  const propsShowInPlayground = ref<string[]>(initialPropsToShow);
  const currentPage = ref(1);
  const itemsPerPage = 100;

  const supportedProps = Object.keys(definitionsProps);
  const props: Array<ComponentProps> = [];

  for (const prop in componentProps) {
    if (!ignoreProps.includes(prop)) {
      props.push({
        name: toCapitalize(prop),
        key: prop,
        default: componentProps[prop].default || "",
        supported: supportedProps.includes(prop),
        figmaType: undefined,
      });
    }
  }

  props.sort((a, b) => {
    if (a.supported === b.supported) {
      return a.name.localeCompare(b.name);
    }
    return a.supported ? -1 : 1;
  });

  const allCombinations = computed(() => {
    const selectedDefinitionsProps: Record<string, { values: unknown[] }> = {};
    propsShowInPlayground.value.forEach((prop) => {
      const selectedValues = selectedValuesByProp.value[prop];
      if (selectedValues && selectedValues.length > 0) {
        selectedDefinitionsProps[prop] = { values: selectedValues };
      } else if (definitionsProps[prop]) {
        selectedDefinitionsProps[prop] = {
          values: definitionsProps[prop].values,
        };
      }
    });

    return generateCombinations(
      propsShowInPlayground.value,
      selectedDefinitionsProps
    );
  });

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

  return {
    search,
    propsShowInPlayground,
    currentPage,
    itemsPerPage,
    props,
    definitionsProps,
    allCombinations,
    totalItems,
    totalPages,
    paginatedCombinations,
  };
}
