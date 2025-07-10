// https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties#h_01HBH47NCGPF4ZER4PC9AQG7S0
// https://www.figma.com/plugin-docs/api/ComponentPropertyType/
export type ComponentPropertyType =
  | "BOOLEAN"
  | "TEXT"
  | "INSTANCE_SWAP"
  | "VARIANT";

export type ComponentProps = {
  name: string;
  key: string;
  default: string;
  supported: boolean;
  figmaType: ComponentPropertyType | "VARIABLE_MODE" | undefined;
};

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Función para generar todas las combinaciones posibles
export const generateCombinations = (
  propsShowInPlayground: string[],
  definitionsProps: Record<string, { values: unknown[] }>
) => {
  // Filtrar solo las props que están habilitadas y tienen definiciones
  const availableProps = propsShowInPlayground.filter(
    (prop) => definitionsProps[prop]
  );

  // Si no hay props activas, retornar array vacío
  if (availableProps.length === 0) {
    return [];
  }

  // Generar solo combinaciones completas (todas las propiedades incluidas)
  const generateFullCombinations = (
    propList: string[],
    values: Record<string, unknown[]>
  ) => {
    const result: Array<{ props: Record<string, unknown>; label: string }> = [];

    // Función recursiva para generar combinaciones completas
    const combine = (
      currentProps: Record<string, unknown>,
      propIndex: number,
      label: string
    ) => {
      if (propIndex === propList.length) {
        // Solo agregar si incluye todas las propiedades
        if (Object.keys(currentProps).length === propList.length) {
          result.push({ props: { ...currentProps }, label });
        }
        return;
      }

      const currentProp = propList[propIndex];
      const propValues = values[currentProp];

      // Incluir esta prop con cada uno de sus valores
      propValues.forEach((value) => {
        const newProps = { ...currentProps, [currentProp]: value };
        const valueLabel = value === undefined ? "undefined" : String(value);
        const newLabel = label
          ? `${label}, ${currentProp}=${valueLabel}`
          : `${currentProp}=${valueLabel}`;
        combine(newProps, propIndex + 1, newLabel);
      });
    };

    combine({}, 0, "");
    return result;
  };

  // Crear objeto con valores para cada prop
  const propValues: Record<string, unknown[]> = {};
  availableProps.forEach((prop) => {
    propValues[prop] = definitionsProps[prop].values;
  });

  return generateFullCombinations(availableProps, propValues);
};
