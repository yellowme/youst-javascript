import { useEffect } from "react";

import api from "../api";

import {
  usePokemonApi,
  FETCH_ALL_POKEMON_SUCCESS,
  FETCH_ALL_POKEMON_FAILURE,
  FETCH_ALL_POKEMON_REQUEST
} from "../context/PokemonContext";

export default function useAllPokemons() {
  const [state, dispatch] = usePokemonApi();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        dispatch({ type: FETCH_ALL_POKEMON_REQUEST });
        const data = await api.allPokemons();

        dispatch({
          type: FETCH_ALL_POKEMON_SUCCESS,
          payload: { data }
        });
      } catch (error) {
        dispatch({
          type: FETCH_ALL_POKEMON_FAILURE,
          payload: { error }
        });
      }
    }

    fetchPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return state;
}
