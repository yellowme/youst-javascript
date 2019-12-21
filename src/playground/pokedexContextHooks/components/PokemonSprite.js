import React from "react";

import LazyImage from "../../../core/components/LazyImage";

export default function PokemonSprite({ src, alt }) {
  return (
    <div className="pokemon--species--sprite">
      <LazyImage alt={alt} src={src} />
    </div>
  );
}
