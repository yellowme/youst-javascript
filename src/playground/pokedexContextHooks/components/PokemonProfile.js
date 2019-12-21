import React from "react";

import usePokemon from "../hooks/usePokemon";
import PokemonSprite from "../components/PokemonSprite";
import useLozad from "../../../core/hooks/useLozad";

export default function PokemonProfile({ match }) {
  useLozad();
  const { data, error, loading } = usePokemon(match.params.id);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="pokeapp">
      <p> {data.pokemon.name} </p>
      <div className="pokemon--species--list">
        {data.pokemon.sprites.map(sprite => (
          <PokemonSprite key={sprite} alt={sprite} src={sprite} />
        ))}
      </div>
    </div>
  );
}
