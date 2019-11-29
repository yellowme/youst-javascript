import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./dashboard";
import HackerNews from "./miniApps/hackernews";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/mini-apps/hacker-news">
          <HackerNews />
        </Route>
      </Switch>
    </Router>
  );
}
