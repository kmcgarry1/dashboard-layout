<template>
  <div class="w-full">
    <form class="relative" @submit.prevent="handleSubmit">
      <span
        class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-4 w-4"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3a7.5 7.5 0 1 0 4.743 13.324l3.216 3.217a.75.75 0 1 0 1.06-1.06l-3.217-3.217A7.5 7.5 0 0 0 10.5 3ZM5 10.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>

      <input
        :value="internalValue"
        :placeholder="props.placeholder"
        class="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-24 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        type="search"
        name="pokemon-search"
        autocomplete="off"
        spellcheck="false"
        @input="handleInput"
        @keydown.escape.prevent="handleClear"
      />

      <div class="absolute inset-y-0 right-2 flex items-center gap-2">
        <button
          v-if="internalValue && !props.loading"
          type="button"
          class="rounded-full p-1 text-slate-400 transition hover:text-slate-600"
          aria-label="Clear search"
          @click="handleClear"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm1.536-10.536a.75.75 0 1 0-1.06-1.06L10 6.94l-.475-.475a.75.75 0 1 0-1.06 1.06L8.94 8l-.475.475a.75.75 0 1 0 1.06 1.06L10 9.06l.475.475a.75.75 0 0 0 1.06-1.06L11.06 8l.475-.475Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <span
          v-if="props.loading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-500"
          aria-label="Loading"
        ></span>

        <button
          type="submit"
          class="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          :disabled="!internalValue || props.loading"
        >
          Search
        </button>
      </div>
    </form>

    <p v-if="props.error" class="mt-1 text-xs text-rose-500">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    loading?: boolean;
    error?: string | null;
  }>(),
  {
    modelValue: "",
    placeholder: "Search Pokémon…",
    loading: false,
    error: null,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
  (e: "clear"): void;
}>();

const internalValue = computed({
  get: () => props.modelValue ?? "",
  set: (value: string) => emit("update:modelValue", value),
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  internalValue.value = target.value;
};

const handleSubmit = () => {
  emit("search", internalValue.value);
};

const handleClear = () => {
  if (!internalValue.value) {
    return;
  }
  internalValue.value = "";
  emit("clear");
};
</script>
