import { useEffect } from "react";

import api from "../api";

import {
  usePokemonState,
  usePokemonDispatch,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  FETCH_POKEMON_REQUEST
} from "../context/PokemonContext";

export default function usePokemon(id) {
  const state = usePokemonState();
  const dispatch = usePokemonDispatch();

  useEffect(() => {
    async function fetchPokemonById() {
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

    fetchPokemonById();
  }, [dispatch, id]);

  return state;
}
