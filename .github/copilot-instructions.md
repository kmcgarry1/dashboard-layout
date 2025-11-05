# GitHub Copilot Instructions

## Overview

- Single-page Pokédex dashboard built with Vue 3, Vite, and TypeScript; routing and state are centralized in `src/router/index.ts` and Pinia.
- `src/main.ts` bootstraps the app with Pinia, Vue Router, and Tailwind styles defined in `src/style.css`.
- `src/components/dashboard/Layout.vue` wraps the navigation column, header, and active route content.
- Global Vue SFC typings live in `src/env.d.ts`; add shared ambient types there instead of sprinkling `// @ts-ignore`.

## Architecture & Routing

- Router exposes a single layout route `/` with optional `:navId`; unknown paths redirect to the first navigation item (`src/router/index.ts`).
- `Layout.vue` watches `navId`, redirects via `router.replace` when the param is missing/invalid, and keeps the header in sync with navigation state.
- `src/pages/DataViewPage.vue` loads data on mount, mediates loading/error states, and funnels category Pokémon into `DataView.vue`.

## Data & State

- `useNavigationStore` (`src/stores/navigation.ts`) owns category/Pokémon data, guards duplicate loads with `loading`/`isLoaded`, and surfaces `getById`, `hasId`, `firstItemId`.
- `useSearchStore` (`src/stores/search.ts`) performs ad-hoc PokéAPI lookups for the header search bar and normalizes responses with `normalizePokemon` (`src/utils/pokemon.ts`).
- Edit `CATEGORY_CONFIG` within the store to add or reorder dashboard sections; the rest of the UI reads from the store.
- `normalizePokemon` (`src/utils/pokemon.ts`) converts PokéAPI responses into the `DataItem` shape with sprite fallbacks and stat/value arrays; both stores reuse it.

## UI Patterns

- Layout primitives (`src/components/core/`) bundle Tailwind utilities; prefer `<Card>`, `<Column>`, and `<Row>` over raw `<div>` containers.
- `Card.vue` now exposes named slots (`text-primary`, `text-secondary`, `text-tertiary`, `image`) plus an `imagePlacement` prop (`top|bottom|left|right`)—populate these instead of hard-coding structure in consumers.
- `SearchInput.vue` emits `search`/`clear` events with a `modelValue` binding; `HeaderBar.vue` wires it to the search store and displays results inline.
- `NavigationColumn.vue` consumes full `NavigationItem` objects and emits `select`; avoid mutating store data directly.
- Pokémon detail components under `src/components/pokemon-display/` compose image, metadata, abilities, and stats via nested components.
- Reuse the `Card` slots and `imagePlacement` prop when building new cards; see `Pokemon.vue` for a top-aligned image example.

## Stats & Visualisation

- `PokemonStats.vue` computes each Pokémon’s max stat and passes it to `PokemonStatBar.vue` as `max-value`.
- `PokemonStatBar.vue` normalizes widths against the maximum of `(maxValue ?? stat.value)` and `BASE_STAT_MIN`, so lower-level Pokémon still render proportionate bars; reuse this prop when embedding stat bars elsewhere.

## Async & Error Handling

- Always call `navigationStore.load()` within mounted hooks; side effects populate `items` and `firstItemId` even if data was previously fetched.
- Loading and error copy lives in `Layout.vue` and `DataViewPage.vue`; extend those computed branches rather than duplicating banners elsewhere.
- Router guards rely on populated store state—ensure loads complete before pushing new `navId`s.

## Developer Workflow

- Install dependencies with `npm install`; start locally with `npm run dev` (Vite dev server using the `rolldown-vite` override).
- Type-check/build with `npm run build`; preview the production bundle via `npm run preview`.
- No automated tests ship with the repo; if you introduce one, add a matching `npm run test` script.
- Direct PokéAPI helpers exist in `src/api/pokeapi.ts`; the dashboard currently hits the API through the navigation store, so prefer centralizing new fetch logic there.

## Conventions & Tips

- Components use `<script setup lang="ts">`; keep helper functions pure and colocated.
- Favor `storeToRefs` when exposing Pinia state (`Layout.vue`, `DataViewPage.vue`) to retain reactivity while destructuring.
- Tailwind utilities dominate styling; prefer updating `tailwind.config.js` over inline styles when adding design tokens.
- Normalize external data in the store; components assume `DataItem` contains already-formatted stats, abilities, and sprites.
