import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import { MINI_APP_BASE_ROUTE } from "./constants";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";
import PokemonProvider from "./context/PokemonContext";

export default function Pokedex() {
  return (
    <>
      <Helmet>
        <title>Pokedex</title>
      </Helmet>
      <PokemonProvider>
        <Switch>
          <Route exact path={MINI_APP_BASE_ROUTE} component={PokemonList} />
          <Route
            exact
            path={`${MINI_APP_BASE_ROUTE}/:id`}
            component={PokemonProfile}
          />
        </Switch>
      </PokemonProvider>
    </>
  );
}
