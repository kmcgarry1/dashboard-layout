import type { PokemonDetailed } from "../api/pokeapi";
import type { DataItem, PokemonStat } from "../components/dashboard/types";

const getSprite = (pokemon: PokemonDetailed): string => {
  const other = pokemon.sprites.other ?? {};
  const officialArtwork = (
    other["official-artwork"] ?? other["official_artwork"]
  )?.front_default;
  return officialArtwork ?? pokemon.sprites.front_default ?? "";
};

export const normalizePokemon = (pokemon: PokemonDetailed): DataItem => {
  const stats: PokemonStat[] = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const abilities = pokemon.abilities.map((entry) => entry.ability.name);

  return {
    id: String(pokemon.id),
    name: pokemon.name,
    sprite: getSprite(pokemon),
    types: pokemon.types.map((type) => type.type.name),
    baseExperience: pokemon.base_experience,
    height: pokemon.height,
    weight: pokemon.weight,
    abilities,
    stats,
  };
};
