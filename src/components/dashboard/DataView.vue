<template>
  <div class="flex h-full w-full">
    <div
      v-if="props.items.length"
      class="grid w-full auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      <Card
        v-for="item in props.items"
        :key="item.id"
        class="flex h-full flex-col justify-between gap-3"
      >
        <div class="flex flex-col gap-3">
          <span class="text-sm font-medium text-slate-500">
            {{ item.title }}
          </span>
          <span class="text-3xl font-semibold text-slate-900">
            {{ item.value }}
          </span>
        </div>
        <div class="space-y-1">
          <p
            v-if="item.change"
            :class="[
              'text-xs font-semibold',
              item.change.startsWith('-')
                ? 'text-rose-600'
                : 'text-emerald-600',
            ]"
          >
            {{ item.change }}
          </p>
          <p v-if="item.description" class="text-xs text-slate-500">
            {{ item.description }}
          </p>
        </div>
      </Card>
    </div>
    <div
      v-else
      class="flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-12 text-sm text-slate-500"
    >
      Select a navigation item to view data.
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card } from "../core";
import type { DataItem } from "./types";

const props = withDefaults(
  defineProps<{
    items?: DataItem[];
  }>(),
  {
    items: () => [],
  }
);
</script>
