const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonBasic {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface PokemonDetailed extends PokemonBasic {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
}

// Get list of Pokemon (lightweight)
export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonList> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) throw new Error("Failed to fetch Pokemon list");
  return response.json();
}

// Get basic Pokemon info
export async function getPokemonBasic(
  nameOrId: string | number
): Promise<PokemonBasic> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error("Failed to fetch Pokemon");
  return response.json();
}

// Get detailed Pokemon info
export async function getPokemonDetailed(
  nameOrId: string | number
): Promise<PokemonDetailed> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error("Failed to fetch Pokemon details");
  return response.json();
}

// Get Pokemon species info (for descriptions, evolution chain, etc.)
export async function getPokemonSpecies(nameOrId: string | number) {
  const response = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
  if (!response.ok) throw new Error("Failed to fetch Pokemon species");
  return response.json();
}

// Get Pokemon type info
export async function getPokemonType(nameOrId: string | number) {
  const response = await fetch(`${BASE_URL}/type/${nameOrId}`);
  if (!response.ok) throw new Error("Failed to fetch Pokemon type");
  return response.json();
}
