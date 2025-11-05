<template>
  <div class="flex flex-1 items-center gap-3">
    <div class="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="{
          'bg-red-500': props.stat.value < 30,
          'bg-orange-500': props.stat.value >= 30 && props.stat.value < 60,
          'bg-yellow-500': props.stat.value >= 60 && props.stat.value < 90,
          'bg-green-500': props.stat.value >= 90 && props.stat.value < 120,
          'bg-cyan-500': props.stat.value >= 120 && props.stat.value < 150,
          'bg-blue-500': props.stat.value >= 150,
        }"
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

const BASE_STAT_MIN = 0;

const props = defineProps<{
  stat: {
    name: string;
    value: number;
  };
  maxValue?: number;
}>();

const normalizedValue = computed(() => {
  const highestStat = Math.max(
    BASE_STAT_MIN,
    props.maxValue ?? props.stat.value
  );
  const dynamicMax = Math.max(highestStat, BASE_STAT_MIN);
  const clampedValue = Math.min(
    Math.max(props.stat.value, BASE_STAT_MIN),
    dynamicMax
  );
  return Math.round((clampedValue / dynamicMax) * 100);
});
</script>
