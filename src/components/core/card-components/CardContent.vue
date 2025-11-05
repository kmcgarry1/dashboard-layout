<template>
  <component :is="tag" :class="contentClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: "sm" | "md" | "lg";
  padded?: boolean;
  tag?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  padded: true,
  tag: "div",
});

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

const contentClasses = computed(() => {
  const classes = [];

  if (props.padded) {
    classes.push(paddingMap[props.size]);
  }

  return classes;
});
</script>
