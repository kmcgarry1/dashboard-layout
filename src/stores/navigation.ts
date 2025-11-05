import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { DataItem, NavigationItem, PokemonStat } from "../components/dashboard/types";

interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  pokemon: string[];
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    id: "kanto-starters",
    label: "Kanto Starters",
    description: "Classic starter Pokémon from the Kanto region.",
    pokemon: ["bulbasaur", "charmander", "squirtle"],
  },
  {
    id: "electric-icons",
    label: "Electric Icons",
    description: "High-voltage favourites with electrifying stats.",
    pokemon: ["pikachu", "raichu", "jolteon"],
  },
  {
    id: "legendary-birds",
    label: "Legendary Birds",
    description: "The legendary bird trio from the Kanto region.",
    pokemon: ["articuno", "zapdos", "moltres"],
  },
  {
    id: "dragon-rivals",
    label: "Dragon Rivals",
    description: "Powerful dragon-type rivals from Hoenn and beyond.",
    pokemon: ["garchomp", "salamence", "dragonite"],
  },
];

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function fetchPokemon(name: string): Promise<DataItem> {
  const response = await fetch(`${API_BASE_URL}/${name}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${name}`);
  }

  const data = await response.json();

  const sprite =
    data.sprites?.other?.["official-artwork"]?.front_default ??
    data.sprites?.front_default ??
    "";

  const stats: PokemonStat[] = data.stats.map((stat: any) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const abilities: string[] = data.abilities.map(
    (ability: any) => ability.ability.name
  );

  return {
    id: String(data.id),
    name: data.name,
    sprite,
    types: data.types.map((type: any) => type.type.name),
    baseExperience: data.base_experience,
    height: data.height,
    weight: data.weight,
    abilities,
    stats,
  };
}

export const useNavigationStore = defineStore("navigation", () => {
  const items = ref<NavigationItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const isLoaded = ref(false);

  const firstItemId = computed<NavigationItem["id"] | null>(
    () => items.value[0]?.id ?? null
  );

  const getById = (id: NavigationItem["id"]) =>
    items.value.find((item) => item.id === id);

  const hasId = (id: NavigationItem["id"]) =>
    items.value.some((item) => item.id === id);

  const load = async () => {
    if (loading.value || isLoaded.value) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const categories = await Promise.all(
        CATEGORY_CONFIG.map(async (category) => {
          const pokemonEntries = await Promise.all(
            category.pokemon.map((name) => fetchPokemon(name))
          );

          return {
            id: category.id,
            label: category.label,
            description: category.description,
            items: pokemonEntries,
          } satisfies NavigationItem;
        })
      );

      items.value = categories;
      isLoaded.value = true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load Pokémon data.";
      error.value = message;
      items.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    items,
    firstItemId,
    getById,
    hasId,
    load,
    loading,
    error,
    isLoaded,
  };
});
