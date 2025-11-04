<template>
  <div :class="columnClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  width?: "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  width: "md",
});

const WIDTH_CLASSES = {
  sm: "lg:max-w-[200px] lg:basis-[200px]",
  md: "lg:max-w-[300px] lg:basis-[300px]",
  lg: "lg:max-w-[400px] lg:basis-[400px]",
  xl: "lg:max-w-[500px] lg:basis-[500px]",
} as const;

const columnClass = computed(() =>
  props.width
    ? [
        "flex flex-1 w-full flex-col overflow-auto px-2",
        "lg:flex-none",
        WIDTH_CLASSES[props.width],
      ]
    : ["flex flex-1 w-full flex-col overflow-auto px-2"]
);
</script>
