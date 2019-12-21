import React from "react";

import Pokemon from "./Pokemon";
import useAllPokemons from "../hooks/useAllPokemons";
import useLozad from "../../../core/hooks/useLozad";

export default function PokemonList() {
  useLozad();
  const { data, error, loading } = useAllPokemons();

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="pokeapp">
      <p> The Kanto PokeDex! </p>
      <div className="pokemon--species--list">
        {data.allPokemons.map((pokemon, id) => (
          <Pokemon
            to={pokemon.url}
            key={pokemon.name}
            id={id + 1}
            name={pokemon.name}
          />
        ))}
      </div>
    </div>
  );
}
