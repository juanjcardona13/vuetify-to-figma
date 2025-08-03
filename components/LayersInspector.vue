<script setup lang="ts">
interface LayerInfo {
  tagName: string;
  className: string;
  id: string;
  textContent: string;
  depth: number;
  styles: {
    display: string;
    position: string;
    width: string;
    height: string;
    backgroundColor: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    margin: string;
    padding: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    zIndex: string;
  };
  attributes: Array<{ name: string; value: string }>;
  children: LayerInfo[];
}

interface TreeNode {
  id: string;
  title: string;
  tagName: string;
  className: string;
  idAttr: string;
  textContent: string;
  depth: number;
  styles: LayerInfo["styles"];
  attributes: LayerInfo["attributes"];
  children: TreeNode[];
}

const extractedLayers = inject("extractedLayers", ref<LayerInfo[]>([]));

// Función para convertir las capas en estructura de árbol
const convertLayersToTree = (layers: LayerInfo[]): TreeNode[] => {
  const tree: TreeNode[] = [];
  const stack: { node: TreeNode; depth: number }[] = [];

  layers.forEach((layer, index) => {
    const node: TreeNode = {
      id: `layer-${index}`,
      title: generateLayerTitle(layer),
      tagName: layer.tagName,
      className: layer.className,
      idAttr: layer.id,
      textContent: layer.textContent,
      depth: layer.depth,
      styles: layer.styles,
      attributes: layer.attributes,
      children: [],
    };

    // Encontrar el padre correcto basado en la profundidad
    while (stack.length > 0 && stack[stack.length - 1].depth >= layer.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    stack.push({ node, depth: layer.depth });
  });

  return tree;
};

// Función para generar el título de la capa
const generateLayerTitle = (layer: LayerInfo): string => {
  let title = layer.tagName;

  if (layer.className) {
    title += `.${layer.className}`;
  }

  if (layer.id) {
    title += `#${layer.id}`;
  }

  if (layer.textContent && layer.textContent.trim()) {
    const text = layer.textContent.trim();
    if (text.length > 30) {
      title += ` - "${text.substring(0, 30)}..."`;
    } else {
      title += ` - "${text}"`;
    }
  }

  return title;
};

// Función para obtener el icono según el tipo de elemento
const getLayerIcon = (tagName: string): string => {
  const iconMap: Record<string, string> = {
    div: "mdi-square-outline",
    span: "mdi-text",
    p: "mdi-text",
    button: "mdi-gesture-tap-button",
    input: "mdi-form-textbox",
    img: "mdi-image",
    svg: "mdi-vector-polyline",
    path: "mdi-vector-polyline",
    circle: "mdi-circle-outline",
    rect: "mdi-square-outline",
    a: "mdi-link",
    ul: "mdi-format-list-bulleted",
    li: "mdi-format-list-numbered",
    table: "mdi-table",
    tr: "mdi-table-row",
    td: "mdi-table-cell",
    th: "mdi-table-headers-eye",
    form: "mdi-form-select",
    label: "mdi-label",
    textarea: "mdi-form-textarea",
    select: "mdi-form-dropdown",
    option: "mdi-menu-down",
    h1: "mdi-format-header-1",
    h2: "mdi-format-header-2",
    h3: "mdi-format-header-3",
    h4: "mdi-format-header-4",
    h5: "mdi-format-header-5",
    h6: "mdi-format-header-6",
  };

  return iconMap[tagName] || "mdi-tag";
};

// Computed para convertir las capas en estructura de árbol
const treeItems = computed(() => {
  return convertLayersToTree(extractedLayers.value);
});

// Estado para mostrar detalles
const showDetails = ref(false);
const selectedNode = ref<TreeNode | null>(null);

// Función para manejar la selección de nodos
const handleNodeSelect = (selectedIds: unknown) => {
  if (Array.isArray(selectedIds) && selectedIds.length > 0) {
    const selectedId = selectedIds[0] as string;
    const findNode = (items: TreeNode[]): TreeNode | null => {
      for (const item of items) {
        if (item.id === selectedId) {
          return item;
        }
        if (item.children.length > 0) {
          const found = findNode(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    selectedNode.value = findNode(treeItems.value);
    showDetails.value = true;
  }
};
</script>

<template>
  <VContainer class="elevation-1">
    <VRow>
      <VCol cols="12">
        <div class="d-flex align-center justify-space-between mb-4">
          <h3 class="text-primary">Estructura de Capas</h3>
          <VSwitch
            v-model="showDetails"
            label="Mostrar detalles"
            color="primary"
            hide-details
            density="compact"
          />
        </div>

        <div v-if="extractedLayers.length > 0" class="d-flex">
          <!-- Árbol de capas -->
          <div
            class="flex-grow-1"
            :class="{ 'me-4': showDetails && selectedNode }"
          >
            <VTreeview
              :items="treeItems"
              item-value="id"
              open-all
              open-on-click
              density="compact"
              class="layers-treeview"
              @update:selected="handleNodeSelect"
            >
              <template #prepend="{ item }">
                <VIcon
                  :icon="getLayerIcon(item.tagName)"
                  size="small"
                  class="me-2"
                />
              </template>

              <template #title="{ item }">
                <div class="d-flex align-center">
                  <span class="font-weight-medium">{{ item.title }}</span>
                  <VChip
                    v-if="item.depth > 0"
                    size="x-small"
                    color="primary"
                    variant="tonal"
                    class="ms-2"
                  >
                    Prof: {{ item.depth }}
                  </VChip>
                </div>
              </template>
            </VTreeview>
          </div>

          <!-- Panel de detalles -->
          <div
            v-if="showDetails && selectedNode"
            class="flex-shrink-0"
            style="width: 300px"
          >
            <VCard class="elevation-2">
              <VCardTitle class="text-h6 pa-4 pb-2">
                <VIcon
                  :icon="getLayerIcon(selectedNode.tagName)"
                  class="me-2"
                  size="small"
                />
                {{ selectedNode.tagName }}
              </VCardTitle>

              <VCardText class="pa-4 pt-2">
                <div v-if="selectedNode.textContent" class="mb-3">
                  <strong class="text-caption">Contenido:</strong>
                  <div class="text-body-2 mt-1 pa-2 bg-grey-lighten-4 rounded">
                    {{ selectedNode.textContent }}
                  </div>
                </div>

                <div v-if="selectedNode.idAttr" class="mb-3">
                  <strong class="text-caption">ID:</strong>
                  <div class="text-body-2 mt-1">{{ selectedNode.idAttr }}</div>
                </div>

                <div v-if="selectedNode.className" class="mb-3">
                  <strong class="text-caption">Clase:</strong>
                  <div class="text-body-2 mt-1">
                    {{ selectedNode.className }}
                  </div>
                </div>

                <div class="mb-3">
                  <strong class="text-caption">Estilos:</strong>
                  <VList density="compact" class="mt-1">
                    <VListItem
                      v-for="(value, key) in selectedNode.styles"
                      :key="key"
                      class="pa-1"
                      v-show="
                        value && value !== 'initial' && value !== 'normal'
                      "
                    >
                      <div class="d-flex justify-space-between">
                        <span class="text-caption">{{ key }}:</span>
                        <span
                          class="text-caption text-truncate"
                          style="max-width: 150px"
                        >
                          {{ value }}
                        </span>
                      </div>
                    </VListItem>
                  </VList>
                </div>

                <div v-if="selectedNode.attributes.length > 0" class="mb-3">
                  <strong class="text-caption">Atributos:</strong>
                  <VList density="compact" class="mt-1">
                    <VListItem
                      v-for="attr in selectedNode.attributes"
                      :key="attr.name"
                      class="pa-1"
                    >
                      <div class="d-flex justify-space-between">
                        <span class="text-caption">{{ attr.name }}:</span>
                        <span
                          class="text-caption text-truncate"
                          style="max-width: 150px"
                        >
                          {{ attr.value }}
                        </span>
                      </div>
                    </VListItem>
                  </VList>
                </div>
              </VCardText>
            </VCard>
          </div>
        </div>

        <VAlert v-else type="info" variant="tonal" class="mt-2">
          Haz clic en el tab "Layers" para extraer las capas del componente.
        </VAlert>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.layers-treeview {
  --icon-size: 18px;
}

.layers-treeview .v-list-item-action {
  display: none;
}

.layers-treeview .v-list-item-title {
  font-size: 0.875rem;
  line-height: 20px;
}

.layers-treeview .v-list-item__prepend > .v-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  font-size: var(--icon-size);
}

.layers-treeview
  .v-list-item--slim
  .v-list-item__prepend
  > .v-list-item-action
  ~ .v-list-item__spacer {
  width: 8px;
}

.layers-treeview .v-list-item--density-compact.v-list-item--one-line {
  min-height: 28px;
  max-height: 28px;
}
</style>
