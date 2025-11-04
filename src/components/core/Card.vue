<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "default" | "outlined" | "elevated" | "flat";
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
});

const sizeClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

const variantClasses = {
  default: "border border-slate-200 bg-white shadow-sm",
  outlined: "border-2 border-slate-200 bg-white",
  elevated:
    "border border-transparent bg-white shadow-lg shadow-slate-200/70",
  flat: "border border-transparent bg-slate-100",
} as const;

const cardClasses = computed(() => [
  "rounded-xl transition-all duration-200",
  variantClasses[props.variant],
  sizeClasses[props.size],
]);
</script>
