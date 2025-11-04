<template>
  <Card
    variant="default"
    size="md"
    class="flex h-full flex-col gap-6 bg-white"
  >
    <div>
      <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Navigation
      </h2>
      <p class="mt-1 text-sm text-slate-600">
        Choose a view to update the dashboard.
      </p>
    </div>

    <nav class="flex flex-col gap-2">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        @click="emitSelect(item.id)"
        :class="[
          'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition',
          item.id === activeId
            ? 'bg-slate-900 text-white shadow'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        ]"
      >
        <span>{{ item.label }}</span>
        <span
          class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500"
        >
          {{ item.items.length }}
        </span>
      </button>
    </nav>

    <div
      v-if="activeItem?.description"
      class="rounded-lg bg-slate-50 p-4 text-sm text-slate-600"
    >
      {{ activeItem.description }}
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../core";
import type { NavigationItem } from "./types";

const props = defineProps<{
  items: NavigationItem[];
  activeId?: NavigationItem["id"];
}>();

const emit = defineEmits<{
  (e: "select", id: NavigationItem["id"]): void;
}>();

const activeItem = computed(() =>
  props.items.find((item) => item.id === props.activeId)
);

const emitSelect = (id: NavigationItem["id"]) => {
  if (id !== props.activeId) {
    emit("select", id);
  }
};
</script>
