<template>
  <Card class="w-full" size="md" variant="flat">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="space-y-1.5">
        <CardText variant="title" tag="h1" class="text-2xl sm:text-3xl">
          {{ props.title }}
        </CardText>
        <CardText
          v-if="props.subtitle"
          variant="body"
          class="text-sm text-slate-600"
        >
          {{ props.subtitle }}
        </CardText>
      </div>

      <div class="w-full max-w-xl sm:w-auto">
        <SearchInput
          v-model="query"
          :loading="isSearching"
          :error="searchError"
          placeholder="Search for a Pokémon by name…"
          @search="handleSearch"
          @clear="handleClear"
        />
        <p
          v-if="searchResultName"
          class="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Showing: {{ searchResultName }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { Card, SearchInput } from "../core";
import { CardText } from "../core/card-components";
import { useSearchStore } from "../../stores/search";

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: "Dashboard",
  }
);

const searchStore = useSearchStore();
const { loading, error, result } = storeToRefs(searchStore);

const query = ref("");

const isSearching = computed(() => loading.value);
const searchError = computed(() => error.value);
const searchResultName = computed(() => {
  if (!result.value) {
    return "";
  }
  const name = result.value.name;
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const handleSearch = async (value: string) => {
  const term = value.trim();
  if (!term) {
    handleClear();
    return;
  }
  await searchStore.search(term);
};

const handleClear = () => {
  query.value = "";
  searchStore.clear();
};

watch(
  () => query.value,
  (value) => {
    if (!value) {
      searchStore.clear();
    }
  }
);
</script>
