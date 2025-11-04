<template>
  <Card class="w-full">
    <div
      class="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">
          {{ props.title }}
        </h1>
        <p v-if="props.subtitle" class="text-sm text-slate-600">
          {{ props.subtitle }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from "../core";

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: "Dashboard",
  }
);
</script>
