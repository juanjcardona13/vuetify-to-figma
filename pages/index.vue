<script setup lang="ts">
// import * as vuetify_locale from 'vuetify/locale';
// import * as vuetify_directives from 'vuetify/directives';
import * as vuetify_labs_components from "vuetify/labs/components";
import * as vuetify_components from "vuetify/components";

const vuetifyComponents = Object.keys(vuetify_components);
const vuetifyLabsComponents = Object.keys(vuetify_labs_components);

const ignoreComponents = [
  "VVirtualScroll",
  "VValidation",
  "VThemeProvider",
  "VWindowItem",
  "VTreeviewItem",
  "VTreeview",
  "VTimePickerControls",
  "VTimePickerClock",
  "VTimePicker",
  "VTabsWindowItem",
  "VTabsWindow",
  "VStepperWindowItem",
  "VLazy",
  "VBottomSheet",
  "VCarouselItem",
  "VClassIcon",
  "VCode",
  "VComponentIcon",
  "VMenu",
  "VNoSsr",
];

const completeComponents = [
  "VTextarea",
  "VTextField",

  "VAlert",
  "VAlertTitle",
  "VApp",
  "VAppBar",
  "VBtn",
  "VToolbar",
  "VTimeline",
  "VToolbarItems",
  "VToolbarTitle",
  "VTimelineItem",
  "VAppBarNavIcon",
  "VAppBarTitle",
  "VAutocomplete",
  "VAvatar",
  "VBadge",
  "VBanner",
  "VBannerText",
  "VBannerActions",
  "VBottomNavigation",
  "VBreadcrumbs",
  "VBreadcrumbsDivider",
  "VBreadcrumbsItem",
  "VBtnGroup",
  "VBtnToggle",
  "VCard",
  "VCardActions",
  "VCardItem",
  "VCardSubtitle",
  "VCardTitle",
  "VCardText",
  "VCarousel",
  "VCheckbox",
  "VCheckboxBtn",
  "VChip",
  "VChipGroup",
  "VCol",
  "VColorPicker",
  "VCombobox",
  "VConfirmEdit",
  "VContainer",
  "VCounter",
  "VDataIterator",
  "VList",
  "VListGroup",
  "VListImg",
  "VListItem",
  "VListItemAction",
  "VListItemMedia",
  "VListItemSubtitle",
  "VListItemTitle",
  "VListSubheader",
  "VLocaleProvider",
  "VMain",
  "VMessages",
  "VNavigationDrawer",
];
</script>

<template>
  <div>
    <h1>Vuetify Components</h1>
    <div class="d-flex flex-wrap ga-2">
      <VBtn
        v-for="component in vuetifyComponents.filter(
          (component) => !ignoreComponents.includes(component)
        )"
        :key="component"
        :to="`/${component}`"
        :text="component"
        :variant="completeComponents.includes(component) ? 'flat' : 'tonal'"
        :color="completeComponents.includes(component) ? 'success' : 'primary'"
        elevation="1"
        style="text-transform: none !important"
      />
    </div>

    <h1>Vuetify Labs Components</h1>
    <div class="d-flex flex-wrap ga-2">
      <VBtn
        v-for="component in vuetifyLabsComponents.filter(
          (component) => !ignoreComponents.includes(component)
        )"
        :key="component"
        :to="`/${component}`"
        :text="component"
      />
    </div>
  </div>
</template>
