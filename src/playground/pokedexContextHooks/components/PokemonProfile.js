import React from "react";

import usePokemon from "../hooks/usePokemon";
import PokemonSpeciesList from "./PokemonSpeciesList";
import PokemonSpeciesSprite from "../components/PokemonSpeciesSprite";
import useLozad from "../../../core/hooks/useLozad";

export default function PokemonProfile({ match }) {
  // Lazy load images with LazyImage
  useLozad();
  const { data, error, loading } = usePokemon(match.params.id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div className="pokeapp">
      <p> {data.pokemon.name} </p>
      <PokemonSpeciesList>
        {data.pokemon.sprites.map(sprite => (
          <PokemonSpeciesSprite key={sprite} alt={sprite} src={sprite} />
        ))}
      </PokemonSpeciesList>
    </div>
  );
}
