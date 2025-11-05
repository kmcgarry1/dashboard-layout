<template>
  <Card class="flex h-full flex-col gap-2 p-2">
    <div class="flex items-start gap-2">
      <PokemonImage :src="pokemon.sprite" :name="pokemon.name" size="lg" />
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-semibold text-slate-900">
          {{ formattedName }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700"
          >
            {{ formatType(type) }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3 text-sm text-slate-600">
      <div class="rounded-lg bg-slate-50 p-3 text-center">
        <p class="text-xs uppercase tracking-wide text-slate-500">Base XP</p>
        <p class="text-lg font-semibold text-slate-900">
          {{ pokemon.baseExperience }}
        </p>
      </div>
      <div class="rounded-lg bg-slate-50 p-3 text-center">
        <p class="text-xs uppercase tracking-wide text-slate-500">Height</p>
        <p class="text-lg font-semibold text-slate-900">
          {{ formattedHeight }}
        </p>
      </div>
      <div class="rounded-lg bg-slate-50 p-3 text-center">
        <p class="text-xs uppercase tracking-wide text-slate-500">Weight</p>
        <p class="text-lg font-semibold text-slate-900">
          {{ formattedWeight }}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Abilities
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="ability in pokemon.abilities"
          :key="ability"
          class="rounded-md bg-white px-3 py-1 text-xs font-medium capitalize text-slate-700 shadow-inner"
        >
          {{ formatAbility(ability) }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Base Stats
      </p>
      <PokemonStats :stats="pokemon.stats" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../core";
import PokemonImage from "./PokemonImage.vue";
import PokemonStats from "./PokemonStats.vue";
import type { DataItem } from "../dashboard/types";

const props = defineProps<{
  pokemon: DataItem;
}>();

const formattedName = computed(
  () => props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
);

const formattedHeight = computed(() =>
  props.pokemon.height ? `${(props.pokemon.height / 10).toFixed(1)} m` : "—"
);

const formattedWeight = computed(() =>
  props.pokemon.weight ? `${(props.pokemon.weight / 10).toFixed(1)} kg` : "—"
);

const formatType = (type: string) =>
  type ? type.charAt(0).toUpperCase() + type.slice(1) : type;

const formatAbility = (ability: string) =>
  ability
    ? ability
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ")
    : ability;
</script>
