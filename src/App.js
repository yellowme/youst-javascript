import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./dashboard";
import FeatureHighlight from "./dashboard/components/FeatureHighlight";

const LazyHackerNews = lazy(() => import("./miniApps/hackernews"));
const LazyPokedexContextHooks = lazy(() =>
  import("./playground/pokedexContextHooks")
);

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route
            path={["/playground", "/mini-apps"]}
            exact
            component={FeatureHighlight}
          />
          <Route path="/mini-apps/hacker-news">
            <LazyHackerNews />
          </Route>
          <Route path="/playground/pokedex-context-hooks">
            <LazyPokedexContextHooks />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
