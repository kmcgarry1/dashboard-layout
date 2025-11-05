<template>
  <div class="flex flex-1 items-center gap-3">
    <div class="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        class="h-full rounded-full bg-indigo-500 transition-all duration-300"
        :style="{ width: `${normalizedValue}%` }"
      ></div>
    </div>
    <span class="w-10 text-right font-mono text-xs text-slate-600">
      {{ props.stat.value }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const BASE_STAT_MAX = 255;
const BASE_STAT_MIN = 0;

const props = defineProps<{
  stat: {
    name: string;
    value: number;
  };
}>();

const normalizedValue = computed(() => {
  const clamped = Math.min(
    Math.max(props.stat.value, BASE_STAT_MIN),
    BASE_STAT_MAX
  );
  return Math.round((clamped / BASE_STAT_MAX) * 100);
});
</script>
