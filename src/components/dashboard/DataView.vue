<template>
  <div class="flex h-full w-full">
    <div
      v-if="props.items.length"
      class="grid w-full auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      <PokemonCard
        v-for="item in props.items"
        :key="item.id"
        :pokemon="item"
      />
    </div>
    <div
      v-else
      class="flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-12 text-sm text-slate-500"
    >
      Select a Pokémon category to view details.
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonCard from "../pokemon-display/Pokemon.vue";
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
