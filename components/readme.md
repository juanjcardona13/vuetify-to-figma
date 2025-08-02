# ComponentPlayground - Estructura Refactorizada

Este directorio contiene los componentes refactorizados del `ComponentPlayground.vue` original, divididos en componentes más pequeños y manejables para separar responsabilidades.

## Estructura de Componentes

### Componente Principal
- **`ComponentPlayground.vue`** - Componente principal que orquesta todos los subcomponentes

### Subcomponentes






#### 5. ComponentCard.vue
**Responsabilidad**: Tarjeta individual de componente
- Renderizado de un componente individual
- Menú contextual con tabs
- Integración con LayersInspector y PropertiesInspector

#### 6. LayersInspector.vue
**Responsabilidad**: Inspector de capas del componente
- Extracción de capas del DOM
- Visualización jerárquica de elementos
- Información detallada de estilos y atributos

#### 7. PropertiesInspector.vue
**Responsabilidad**: Inspector de propiedades
- Visualización de las propiedades aplicadas al componente
- Formato legible de las combinaciones

### Composable
- **`useComponentPlayground.ts`** - Lógica de negocio centralizada
- Generación de combinaciones
- Manejo de paginación
- Estado reactivo compartido

## Beneficios de la Refactorización

1. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad específica y bien definida
2. **Mantenibilidad**: Es más fácil mantener y modificar componentes pequeños
3. **Reutilización**: Los componentes pueden ser reutilizados en otros contextos
4. **Testabilidad**: Es más fácil escribir tests para componentes específicos
5. **Legibilidad**: El código es más fácil de entender y navegar
6. **Escalabilidad**: Es más fácil agregar nuevas funcionalidades sin afectar otros componentes

## Flujo de Datos

```
ComponentPlayground.vue (Principal)
└── ComponentGrid.vue (Grid)
    └── ComponentCard.vue (Tarjeta individual)
        ├── PropertiesInspector.vue (Propiedades)
        └── LayersInspector.vue (Capas)
```

## Uso

El componente principal mantiene la misma API que el original, por lo que es compatible con el código existente:

```vue
<ComponentPlayground
  :component-props="componentProps"
  :definitions-props="definitionsProps"
  :ignore-props="ignoreProps"
  :initial-props-to-show="initialPropsToShow"
  :initial-num-columns="initialNumColumns"
>
  <template #component="{ combination }">
    <!-- Tu componente aquí -->
  </template>
</ComponentPlayground>
```