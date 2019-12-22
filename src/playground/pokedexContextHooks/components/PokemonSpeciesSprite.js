import React from "react";

import LazyImage from "../../../core/components/LazyImage";

export default function PokemonSpeciesSprite({ src, alt }) {
  return (
    <div className="pokemon--species--sprite">
      <LazyImage alt={alt} src={src} />
    </div>
  );
}
