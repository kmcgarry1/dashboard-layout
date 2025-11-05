<template>
  <div class="flex h-full w-full">
    <div
      v-if="isLoading"
      class="flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-12 text-sm text-slate-500"
    >
      Loading Pokémon…
    </div>
    <div
      v-else-if="errorMessage"
      class="flex w-full items-center justify-center rounded-xl border border-dashed border-rose-300 bg-rose-50 py-12 text-sm text-rose-600"
    >
      {{ errorMessage }}
    </div>
    <DataView v-else :items="viewItems" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import DataView from "../components/dashboard/DataView.vue";
import { useNavigationStore } from "../stores/navigation";

const props = withDefaults(
  defineProps<{
    navId?: string;
  }>(),
  {
    navId: undefined,
  }
);

const router = useRouter();
const navigationStore = useNavigationStore();
const {
  items: storeItems,
  firstItemId,
  loading,
  error,
  isLoaded,
} = storeToRefs(navigationStore);

onMounted(() => {
  navigationStore.load();
});

const entry = computed(() =>
  props.navId ? navigationStore.getById(props.navId) : undefined
);

watchEffect(() => {
  if (loading.value || error.value) {
    return;
  }

  if (!storeItems.value.length) {
    return;
  }

  if (!entry.value && firstItemId.value) {
    router.replace({
      name: "section",
      params: { navId: firstItemId.value },
    });
  }
});

const viewItems = computed(() => entry.value?.items ?? []);

const isLoading = computed(
  () => loading.value && (!isLoaded.value || !storeItems.value.length)
);

const errorMessage = computed(() =>
  !loading.value && !storeItems.value.length ? error.value : null
);
</script>
