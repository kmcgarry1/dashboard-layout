<template>
  <component :is="tag" :class="textClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";

interface Props {
  variant?: "title" | "subtitle" | "body";
  tag?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "body",
  tag: "p",
});

const textClasses = computed(() => {
  const baseClasses = "text-gray-900";

  const variantClasses = {
    title: "text-xl font-semibold leading-tight",
    subtitle: "text-lg font-medium text-gray-700 leading-snug",
    body: "text-sm leading-relaxed",
  };

  return `${baseClasses} ${variantClasses[props.variant]}`;
});
</script>
