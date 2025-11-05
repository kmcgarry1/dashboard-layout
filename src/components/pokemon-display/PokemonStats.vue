<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="stat in props.stats"
      :key="stat.name"
      class="flex items-center gap-4"
    >
      <span class="w-24 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {{ formatLabel(stat.name) }}
      </span>
      <PokemonStatBar :stat="stat" class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonStatBar from "./PokemonStatBar.vue";

const props = defineProps<{
  stats: {
    name: string;
    value: number;
  }[];
}>();

const formatLabel = (label: string) =>
  label
    .split("-")
    .map((segment) => segment.toUpperCase())
    .join(" ");
</script>
