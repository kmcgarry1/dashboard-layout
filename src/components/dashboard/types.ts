export interface PokemonStat {
  name: string;
  value: number;
}

export interface DataItem {
  id: string;
  name: string;
  sprite: string;
  types: string[];
  baseExperience: number;
  height: number;
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
}

export interface NavigationItem {
  id: string;
  label: string;
  description?: string;
  items: DataItem[];
}
