<template>
  <VApp :theme="isDark ? 'dark' : 'light'">
    <!-- -->
    <!-- This demo took me the whole day -->
    <!-- support Vuetify if you decide to use it -->
    <!-- https://opencollective.com/vuetify -->
    <!-- -->
    <VAppBar>
      <VAppBarTitle>VTreeview with lines</VAppBarTitle>
      <div class="d-flex ga-6 pr-6">
        <VSwitch
          color="success"
          label="icons"
          hide-details
          v-model="showIcons"
        />
        <VSwitch color="success" label="lines" hide-details v-model="enabled" />
        <VSwitch color="success" label="dark" hide-details v-model="isDark" />
      </div>
    </VAppBar>
    <VMain>
      <VContainer max-width="400">
        <VTreeview
          density="compact"
          :class="{ 'with-lines': enabled }"
          :items="items"
          item-value="id"
          open-all
          open-on-click
        >
          <template v-if="showIcons" #prepend="{ item, isOpen }">
            <v-icon :icon="getIcon(item, isOpen)" />
          </template>
        </VTreeview>
      </VContainer>
    </VMain>
  </VApp>
</template>

<script setup>
import { ref } from "vue";
const enabled = ref(true);
const showIcons = ref(true);
const isDark = ref(false);

const files = {
  html: "mdi-language-html5",
  js: "mdi-nodejs",
  ts: "mdi-language-typescript",
  json: "mdi-code-json",
  md: "mdi-language-markdown",
  pdf: "mdi-file-pdf-box",
  png: "mdi-file-image",
  txt: "mdi-file-document-outline",
  xls: "mdi-file-excel",
  mov: "mdi-file-video-outline",
  avi: "mdi-file-video-outline",
  mp4: "mdi-file-video-outline",
};

function getIcon(item, isOpen) {
  if (item.children) return isOpen ? "mdi-folder-open" : "mdi-folder";
  return files[item.title.split(".").at(-1)] ?? "mdi-file-outline";
}
const items = [
  {
    id: 5,
    title: "Documents",
    children: [
      {
        id: 6,
        title: "vuetify",
        children: [
          {
            id: 7,
            title: "src",
            children: [{ id: 8, title: "index.ts" }],
          },
        ],
      },
      {
        id: 101,
        title: "material1",
        children: [
          {
            id: 111,
            title: "src",
            children: [
              { id: 112, title: "v-chip.ts" },
              { id: 113, title: "v-slider.ts" },
            ],
          },
        ],
      },
      {
        id: 10,
        title: "material2",
        children: [
          {
            id: 11,
            title: "src",
            children: [
              { id: 12, title: "v-btn.ts" },
              { id: 13, title: "v-card.ts" },
              { id: 14, title: "v-window.ts" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Downloads",
    children: [
      {
        id: 151,
        title: "Financial",
        children: [{ id: 152, title: "Report.xls" }],
      },
      { id: 16, title: "October.pdf" },
      { id: 17, title: "November.pdf" },
      { id: 18, title: "Tutorial.html" },
    ],
  },
  {
    id: 19,
    title: "Videos",
    children: [
      {
        id: 20,
        title: "Tutorials",
        children: [
          { id: 21, title: "Basic layouts.mp4" },
          { id: 23, title: "New empty folder", children: [] },
          { id: 22, title: "Advanced techniques.mp4" },
        ],
      },
      { id: 24, title: "Intro.mov" },
      { id: 25, title: "Conference introduction.avi" },
    ],
  },
];
</script>

<style>
@import "https://fonts.bunny.net/css?family=recursive:300,400,500,700";
body * {
  font-family: "Recursive", sans-serif !important;
}
.v-treeview {
  /* zoom: 4; -- for inspection */
  --icon-size: 20px;
  .v-list-item-action {
    display: none;
  }
  .v-list-item-title {
    font-size: 0.875rem;
    line-height: 20px;
  }
  .v-list-item__prepend > .v-icon {
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
  }
  .v-list-item--slim
    .v-list-item__prepend
    > .v-list-item-action
    ~ .v-list-item__spacer {
    width: 8px;
  }
  .v-list-item--density-compact.v-list-item--one-line {
    min-height: 28px;
    max-height: 28px;
  }
}

.v-treeview.with-lines {
  /*
      This demo took me whole day
      support Vuetify if you decide to use it
    */

  --v-treeview-line-width: 1px;
  --v-treeview-line-color: rgba(
    var(--v-theme-on-surface),
    var(--v-treeview-line-opacity)
  );
  --v-treeview-line-opacity: 0.5;
  --v-list-item-height: 28px; /* compact: 40px; default: 48px */
  --v-treeview-action-width: 28px;
  --v-treeview-action-icon-size: 24px;
  --v-treeview-leaf-line-width: 12px;
  --v-treeview-group-line-width: 12px;
  .v-list-group__items > .v-list-item,
  .v-list-group__items > .v-list-group {
    position: relative;
    &:before {
      --vertical-line-offset: 0px;
      --vertical-line-length: 100%;
      --horizontal-line-length: 20px; /* overriden below */
      pointer-events: none;
      content: "";
      position: absolute;
      top: var(--vertical-line-offset);
      left: round(up, calc(-1 * var(--v-treeview-line-width) / 2 - 18px), 1px);
      bottom: 0px;
      background-image:
        linear-gradient(
          var(--v-treeview-line-color),
          var(--v-treeview-line-color)
        ),
        linear-gradient(
          var(--v-treeview-line-color),
          var(--v-treeview-line-color)
        );
      background-size:
        var(--v-treeview-line-width) var(--vertical-line-length),
        var(--horizontal-line-length) var(--v-treeview-line-width);
      background-position:
        0px 0px,
        var(--v-treeview-line-width)
          round(
            up,
            calc(
              var(--v-list-item-height) / 2 - var(--vertical-line-offset) -
                var(--v-treeview-line-width) / 2
            ),
            1px
          );
      background-repeat: no-repeat, no-repeat;
      padding-inline-start: calc(var(--indent-padding));
      transform: translateX(100%);
    }
    &:first-child:before {
      --vertical-line-offset: round(
        up,
        calc(
          -1 *
            (
              var(--v-list-item-height) / 2 -
                var(--v-treeview-action-icon-size) / 2
            )
        ),
        1px
      );
    }
    &:last-child:before {
      bottom: round(
        down,
        calc(var(--v-list-item-height) / 2 - var(--v-treeview-line-width) / 2),
        1px
      );
    }
  }
  .v-list-group:last-child > .v-list-group__items > .v-list-item,
  .v-list-group:last-child > .v-list-group__items > .v-list-group {
    &:last-child:before {
      --vertical-line-length: round(
        up,
        calc(
          var(--v-treeview-line-width) / 2 + var(--v-list-item-height) / 2 -
            var(--vertical-line-offset)
        ),
        1px
      );
    }
  }
  .v-list-group:has(+ .v-list-group)
    > .v-list-group__items
    > .v-list-group:last-child:before {
    bottom: round(
      up,
      calc(
        -1 *
          (
            var(--v-list-item-height) / 2 - var(--v-treeview-action-icon-size) /
              2
          )
      ),
      1px
    );
  }
  .v-list-group:has(+ .v-list-group)
    > .v-list-group__items
    > .v-list-item:last-child {
    &:before {
      --vertical-line-length: 100%;
      bottom: calc(
        -1 *
          (
            var(--v-list-item-height) / 2 - var(--v-treeview-action-icon-size) /
              2
          )
      );
    }
  }
  .v-list-group__items > .v-list-item:before {
    --horizontal-line-length: var(--v-treeview-leaf-line-width);
  }
  .v-list-group__items > .v-list-group:before {
    --horizontal-line-length: var(--v-treeview-group-line-width);
  }
}
</style>
