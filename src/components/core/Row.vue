<template>
  <div :class="rowClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "default" | "centered" | "spaced" | "start" | "end";
  gap?: "none" | "sm" | "md" | "lg";
  wrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  gap: "md",
});

const VARIANT_CLASSES = {
  default: "justify-start",
  centered: "justify-center",
  spaced: "justify-between",
  start: "justify-start",
  end: "justify-end",
} as const;

const GAP_CLASSES = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const;

const rowClasses = computed(() => [
  "flex items-center",
  VARIANT_CLASSES[props.variant],
  GAP_CLASSES[props.gap],
  props.wrap === false ? "flex-nowrap" : "flex-wrap",
]);
</script>
