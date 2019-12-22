import React from "react";

import { MINI_APP_BASE_ROUTE } from "../constants";
import PokemonSpeciesSprite from "./PokemonSpeciesSprite";
import Link from '../../../core/components/Link'

export default function PokemonSpecies({ id, name }) {
  return (
    <div className="pokemon--species">
      <Link to={`${MINI_APP_BASE_ROUTE}/${id}`}>
        <div className="pokemon--species--container">
          <PokemonSpeciesSprite
            alt={name}
            src={`${process.env.PUBLIC_URL}/playground/pokedexContextHooks/sprites/${id}.png`}
          />
          <div className="pokemon--species--name"> {name} </div>
        </div>
      </Link>
    </div>
  );
}
