<template>
  <img
    :src="src"
    :alt="alt"
    :class="imageClasses"
    @error="onImageError"
    @load="onImageLoad"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  src: string;
  alt: string;
  variant?: "small" | "medium" | "large" | "cover";
  rounded?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "medium",
  rounded: false,
  loading: false,
});

const imageLoaded = ref(false);
const imageError = ref(false);

const imageClasses = computed(() => [
  "transition-opacity duration-200",
  {
    "opacity-50": props.loading || !imageLoaded.value,
    "opacity-100": imageLoaded.value && !imageError.value,
  },
  // Size variants
  {
    "w-8 h-8": props.variant === "small",
    "w-16 h-16": props.variant === "medium",
    "w-24 h-24": props.variant === "large",
    "w-full h-32 object-cover": props.variant === "cover",
  },
  // Rounded variants
  {
    "rounded-full": props.rounded && props.variant !== "cover",
    "rounded-lg": props.rounded && props.variant === "cover",
    "rounded-md": !props.rounded,
  },
]);

const onImageLoad = () => {
  imageLoaded.value = true;
  imageError.value = false;
};

const onImageError = () => {
  imageLoaded.value = false;
  imageError.value = true;
};
</script>
