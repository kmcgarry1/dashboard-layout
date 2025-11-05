<template>
  <div class="flex h-full w-full pb-4">
    <div
      v-if="hasItems"
      class="grid w-full auto-rows-fr gap-6 md:grid-cols-2 2xl:grid-cols-3"
    >
      <PokemonCard
        v-for="item in itemsToRender"
        :key="item.id"
        :pokemon="item"
      />
    </div>
    <div
      v-else
      class="flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-12 text-sm text-slate-500"
    >
      Select a Pokémon category or search for a Pokémon to view details.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PokemonCard from "../pokemon-display/Pokemon.vue";
import type { DataItem } from "./types";

const props = withDefaults(
  defineProps<{
    items?: DataItem[];
    highlightItem?: DataItem | null;
  }>(),
  {
    items: () => [],
    highlightItem: null,
  }
);

const itemsToRender = computed(() => {
  const baseItems = props.items ?? [];
  if (!props.highlightItem) {
    return baseItems;
  }

  const existing = baseItems.some(
    (item) => item.id === props.highlightItem?.id
  );
  return existing ? baseItems : [props.highlightItem, ...baseItems];
});

const hasItems = computed(() => itemsToRender.value.length > 0);
</script>
