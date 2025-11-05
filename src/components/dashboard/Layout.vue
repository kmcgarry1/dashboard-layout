<template>
  <div
    class="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row"
  >
    <Column width="md" class="px-0">
      <NavigationColumn
        :items="navigationItems"
        :active-id="activeNavId"
        :loading="isLoading"
        :error="errorMessage"
        @select="selectNavigation"
      />
    </Column>
    <div class="flex flex-1 flex-col gap-6 overflow-hidden">
      <HeaderBar :title="headerTitle" :subtitle="headerSubtitle" />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { Column } from "../core";
import HeaderBar from "./HeaderBar.vue";
import NavigationColumn from "./NavigationColumn.vue";
import { useNavigationStore } from "../../stores/navigation";

const route = useRoute();
const router = useRouter();
const navigationStore = useNavigationStore();

const { items, firstItemId, loading, error } = storeToRefs(navigationStore);

onMounted(() => {
  navigationStore.load();
});

const navigationItems = computed(() => items.value);

const activeNavId = computed(() => {
  const param = route.params.navId;
  if (Array.isArray(param)) {
    return param[0];
  }
  return param ?? firstItemId.value ?? undefined;
});

const activeNav = computed(() =>
  activeNavId.value
    ? navigationStore.getById(activeNavId.value) ?? undefined
    : undefined
);

const isLoading = computed(() => loading.value);
const errorMessage = computed(() => error.value);

const headerTitle = computed(() => {
  if (isLoading.value && !items.value.length) {
    return "Loading Pokémon…";
  }
  if (errorMessage.value && !items.value.length) {
    return "Something went wrong";
  }
  return activeNav.value?.label ?? "Pokédex Dashboard";
});

const headerSubtitle = computed(() => {
  if (isLoading.value && !items.value.length) {
    return "Fetching Pokémon data from the PokéAPI.";
  }
  if (errorMessage.value && !items.value.length) {
    return errorMessage.value;
  }
  return activeNav.value?.description;
});

watchEffect(() => {
  if (!items.value.length) {
    return;
  }

  const fallbackId = firstItemId.value;

  if (!activeNavId.value && fallbackId) {
    router.replace({ name: "section", params: { navId: fallbackId } });
    return;
  }

  if (
    activeNavId.value &&
    !navigationStore.hasId(activeNavId.value) &&
    fallbackId
  ) {
    router.replace({ name: "section", params: { navId: fallbackId } });
  }
});

const selectNavigation = (id: string) => {
  if (!id || id === activeNavId.value || isLoading.value) {
    return;
  }
  router.push({ name: "section", params: { navId: id } });
};
</script>
