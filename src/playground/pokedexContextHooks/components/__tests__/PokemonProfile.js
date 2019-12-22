import { MemoryRouter, Route, Switch } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";

import MockedPokemonProvider from "../../jest/MockedPokemonProvider";
import createPokemon from "../../jest/factories/pokemon";
import PokemonProfile from "../PokemonProfile";
import { MINI_APP_BASE_ROUTE } from "../../constants";
import PokemonSpeciesSprite from "../PokemonSpeciesSprite";

function TestPokemonProfile({ pageId = 1, mocks = [] }) {
  return (
    <MockedPokemonProvider mocks={mocks}>
      <MemoryRouter initialEntries={[`${MINI_APP_BASE_ROUTE}/${pageId}`]}>
        <Switch>
          <Route
            exact
            path={`${MINI_APP_BASE_ROUTE}/:id`}
            component={PokemonProfile}
          />
        </Switch>
      </MemoryRouter>
    </MockedPokemonProvider>
  );
}

test("renders pokemon profile", async () => {
  const pokemon = createPokemon();

  const mocks = [
    {
      request: "pokemon",
      response: pokemon
    }
  ];

  const component = renderer.create(<TestPokemonProfile mocks={mocks} />);

  // Loading after query response it renders a loading state
  let tree = component.toJSON();
  expect(tree.children).toContain("Loading...");

  // When the query resolves it sets an state in the
  // apollo provider with the fetched information
  // for our component it will behave as a side-effect
  // and for our test we should capture that side effect
  await renderer.act(async () => {
    await wait(0); // wait for response
  });

  const pokemonSpeciesSprite = component.root.findAllByType(
    PokemonSpeciesSprite
  );

  expect(pokemonSpeciesSprite.length).toBe(Object.keys(pokemon.sprites).length);
  
  Object.keys(pokemon.sprites).forEach((key, i) => {
    const sprite = pokemon.sprites[key];
    expect(pokemonSpeciesSprite[i].props.src).toBe(sprite);
  });
});
