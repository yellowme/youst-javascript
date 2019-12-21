import { useEffect } from "react";

import api from "../api";

import {
  usePokemonApi,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  FETCH_POKEMON_REQUEST
} from "../context/PokemonContext";

export default function usePokemon(id) {
  const [state, dispatch] = usePokemonApi();

  useEffect(() => {
    async function fetchPokemonById(id) {
      try {
        dispatch({ type: FETCH_POKEMON_REQUEST });
        const data = await api.pokemon(id);

        dispatch({
          type: FETCH_POKEMON_SUCCESS,
          payload: { data }
        });
      } catch (error) {
        dispatch({
          type: FETCH_POKEMON_FAILURE,
          payload: { error }
        });
      }
    }

    fetchPokemonById(id);
  }, [dispatch, id]);

  return state;
}
