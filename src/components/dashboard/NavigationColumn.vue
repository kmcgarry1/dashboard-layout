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

    <div v-if="loading" class="flex flex-1 items-center justify-center">
      <span class="text-sm text-slate-500">Loading Pokémon…</span>
    </div>

    <div v-else-if="error" class="rounded-lg bg-rose-50 p-4 text-sm text-rose-600">
      {{ error }}
    </div>

    <template v-else>
      <nav v-if="items.length" class="flex flex-col gap-2">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          :disabled="loading"
          @click="emitSelect(item.id)"
          :class="[
            'flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition',
            item.id === activeId
              ? 'bg-slate-900 text-white shadow'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          ]"
        >
          <span class="capitalize">{{ item.label }}</span>
          <span
            class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500"
          >
            {{ item.items.length }}
          </span>
        </button>
      </nav>

      <div
        v-if="items.length === 0"
        class="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500"
      >
        No Pokémon available.
      </div>

      <div
        v-else-if="activeItem?.description"
        class="rounded-lg bg-slate-50 p-4 text-sm text-slate-600"
      >
        {{ activeItem.description }}
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../core";
import type { NavigationItem } from "./types";

const props = defineProps<{
  items: NavigationItem[];
  activeId?: NavigationItem["id"];
  loading?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: "select", id: NavigationItem["id"]): void;
}>();

const activeItem = computed(() =>
  props.items.find((item) => item.id === props.activeId)
);

const emitSelect = (id: NavigationItem["id"]) => {
  if (!props.loading && id !== props.activeId) {
    emit("select", id);
  }
};
</script>
