import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import prerenderedLazy from "./prerenderedLazy";

import Dashboard from "./dashboard";
import SuspenseLoader from "./core/components/SuspenseLoader";
import FeatureHighlight from "./dashboard/components/FeatureHighlight";

const LazyHackerNews = prerenderedLazy(() => import("./miniApps/hackernews"));
const LazyPokedexContextHooks = prerenderedLazy(() =>
  import("./playground/pokedexContextHooks")
);

export default function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route
            path={["/playground", "/mini-apps"]}
            exact
            component={FeatureHighlight}
          />
          <Route path="/mini-apps/hacker-news" component={LazyHackerNews} />
          <Route
            path="/playground/pokedex-context-hooks"
            component={LazyPokedexContextHooks}
          />
        </Switch>
      </Router>
    </Suspense>
  );
}
