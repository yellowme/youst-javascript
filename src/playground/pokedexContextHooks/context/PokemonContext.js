import React, { useReducer, createContext } from "react";

const PokemonStateContext = createContext();
const PokemonDispatchContext = createContext();

export const FETCH_POKEMON_REQUEST = "FETCH_POKEMON_REQUEST";
export const FETCH_POKEMON_SUCCESS = "FETCH_POKEMON_SUCCESS";
export const FETCH_POKEMON_FAILURE = "FETCH_POKEMON_FAILURE";
export const FETCH_ALL_POKEMON_REQUEST = "FETCH_ALL_POKEMON_REQUEST";
export const FETCH_ALL_POKEMON_SUCCESS = "FETCH_ALL_POKEMON_SUCCESS";
export const FETCH_ALL_POKEMON_FAILURE = "FETCH_ALL_POKEMON_FAILURE";

function pokemonReducer(state, action) {
  switch (action.type) {
    case FETCH_ALL_POKEMON_REQUEST:
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ALL_POKEMON_FAILURE:
    case FETCH_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_ALL_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, allPokemons: action.payload.data }
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          pokemon: {
            ...action.payload.data,
            sprites: Object.keys(action.payload.data.sprites).reduce(
              (sprites, key) => {
                const spriteUrl = action.payload.data.sprites[key];
                if (!spriteUrl) return sprites;
                return [...sprites, spriteUrl];
              },
              []
            )
          }
        }
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = {
  loading: false,
  error: null,
  data: { allPokemons: [], pokemon: { sprites: [] } }
};

export default function PokemonProvider({ children }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonStateContext.Provider value={state}>
      <PokemonDispatchContext.Provider value={dispatch}>
        {children}
      </PokemonDispatchContext.Provider>
    </PokemonStateContext.Provider>
  );
}

export function usePokemonState() {
  const context = React.useContext(PokemonStateContext);
  if (context === undefined) {
    throw new Error("usePokemonState must be used within a PokemonProvider");
  }
  return context;
}

export function usePokemonDispatch() {
  const context = React.useContext(PokemonDispatchContext);
  if (context === undefined) {
    throw new Error("usePokemonDispatch must be used within a PokemonProvider");
  }
  return context;
}
