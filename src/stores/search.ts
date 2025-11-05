import { defineStore } from "pinia";
import { ref } from "vue";
import { getPokemonDetailed } from "../api/pokeapi";
import { normalizePokemon } from "../utils/pokemon";
import type { DataItem } from "../components/dashboard/types";

export const useSearchStore = defineStore("search", () => {
  const result = ref<DataItem | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const search = async (term: string) => {
    const query = term.trim().toLowerCase();
    if (!query) {
      clear();
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const pokemon = await getPokemonDetailed(query);
      result.value = normalizePokemon(pokemon);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to find that Pokémon.";
      error.value = message;
      result.value = null;
    } finally {
      loading.value = false;
    }
  };

  const clear = () => {
    result.value = null;
    error.value = null;
  };

  return {
    result,
    loading,
    error,
    search,
    clear,
  };
});
