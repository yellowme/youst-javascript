import React from "react";

import PokemonSpecies from "./PokemonSpecies";
import PokemonSpeciesList from "./PokemonSpeciesList";
import useAllPokemons from "../hooks/useAllPokemons";
import useLozad from "../../../core/hooks/useLozad";

export default function PokemonList() {
  // Lazy load images with LazyImage
  useLozad();
  const { data, error, loading } = useAllPokemons();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className="pokeapp">
      <p> The Kanto PokeDex! </p>
      <PokemonSpeciesList>
        {data.allPokemons.map((pokemon, id) => (
          <PokemonSpecies
            to={pokemon.url}
            key={pokemon.name}
            id={id + 1}
            name={pokemon.name}
          />
        ))}
      </PokemonSpeciesList>
    </div>
  );
}
