import { MemoryRouter, Route, Switch } from "react-router-dom";
import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";

import MockedPokemonProvider from "../../jest/MockedPokemonProvider";
import createList from "../../../../jest/createList";
import createPokemon from "../../jest/factories/pokemon";
import PokemonList from "../PokemonList";
import PokemonSpecies from "../PokemonSpecies";
import { MINI_APP_BASE_ROUTE, POKEMONS_PER_PAGE } from "../../constants";

function TestPokemonList({ mocks = [] }) {
  return (
    <MockedPokemonProvider mocks={mocks}>
      <MemoryRouter initialEntries={[MINI_APP_BASE_ROUTE]}>
        <Switch>
          <Route exact path={MINI_APP_BASE_ROUTE} component={PokemonList} />
        </Switch>
      </MemoryRouter>
    </MockedPokemonProvider>
  );
}

test("renders pokemon list", async () => {
  const allPokemons = createList(5, createPokemon);

  const mocks = [
    {
      request: "allPokemons",
      response: allPokemons
    }
  ];

  const component = renderer.create(<TestPokemonList mocks={mocks} />);

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

  const pokemonSpecies = component.root.findAllByType(PokemonSpecies);
  expect(pokemonSpecies.length).toBe(5);

  for (let i = 0; i < pokemonSpecies.length; i++) {
    expect(pokemonSpecies[i].props.name).toBe(allPokemons[i].name);
  }
});
