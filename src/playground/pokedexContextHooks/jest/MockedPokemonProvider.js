import React from "react";

import PokemonProvider from "../context/PokemonContext";

import api from "../api";

jest.mock("../api.js");

export default function MockedPokemonProvider({ mocks, children }) {
  mocks.forEach(mock => {
    if (!mock.response || mock.error)
      throw new Error(`No resolved value for ${mock.request}`);

    if (mock.error) api[mock.request].mockRejectedValueOnce(mock.error);
    if (mock.response) api[mock.request].mockResolvedValueOnce(mock.response);
  });

  return <PokemonProvider>{children}</PokemonProvider>;
}
