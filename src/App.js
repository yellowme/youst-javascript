import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./dashboard";

const LazyHackerNews = lazy(() => import("./miniApps/hackernews"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/mini-apps/hacker-news">
            <LazyHackerNews />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
