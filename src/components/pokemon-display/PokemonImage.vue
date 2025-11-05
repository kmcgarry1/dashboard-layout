<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full bg-slate-100',
      sizeClasses[props.size],
    ]"
  >
    <img
      v-if="props.src"
      :src="props.src"
      :alt="altText"
      :class="['object-contain', imageClasses[props.size]]"
      loading="lazy"
      decoding="async"
    />
    <span
      v-else
      :class="[
        'font-semibold text-slate-500',
        props.size === 'lg' ? 'text-3xl' : 'text-2xl',
      ]"
    >
      {{ fallbackInitial }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const sizeClasses = {
  md: "h-20 w-20",
  lg: "h-24 w-24",
} as const;

const imageClasses = {
  md: "h-16 w-16",
  lg: "h-20 w-20",
} as const;

const props = withDefaults(
  defineProps<{
    src?: string;
    name: string;
    size?: "md" | "lg";
  }>(),
  {
    size: "md",
  }
);

const formattedName = computed(() =>
  props.name ? props.name.charAt(0).toUpperCase() + props.name.slice(1) : ""
);

const fallbackInitial = computed(() =>
  formattedName.value ? formattedName.value.charAt(0) : "?"
);

const altText = computed(() =>
  formattedName.value ? `${formattedName.value} sprite` : "Pokémon sprite"
);
</script>
