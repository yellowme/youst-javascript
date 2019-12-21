import React from "react";
import { Link } from "react-router-dom";

import { MINI_APP_BASE_ROUTE } from "../constants";
import PokemonSprite from "./PokemonSprite";

export default function Pokemon({ id, name, to }) {
  return (
    <div className="pokemon--species">
      <Link to={`${MINI_APP_BASE_ROUTE}/${id}`}>
        <div className="pokemon--species--container">
          <PokemonSprite
            alt={name}
            src={`${process.env.PUBLIC_URL}/playground/pokedexContextHooks/sprites/${id}.png`}
          />
          <div className="pokemon--species--name"> {name} </div>
        </div>
      </Link>
    </div>
  );
}
