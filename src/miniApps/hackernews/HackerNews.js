import React from "react";
import { Helmet } from "react-helmet";
import { ApolloProvider } from "react-apollo";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import { client } from "./index";

import LinkList from "./components/LinkList";
import CreateLink from "./components/CreateLink";
import Header from "./components/Header";
import Login from "./components/Login";
import Search from "./components/Search";

export default function HackerNews() {
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>HackerNews</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
        />
      </Helmet>
      <ApolloProvider client={client}>
        <div className="center w85">
          <Header />
          <div className="ph3 pv1 background-gray">
            <Switch>
              <Route
                exact
                path={path}
                render={() => <Redirect to={`${path}/new/1`} />}
              />
              <Route exact path={`${path}/login`} component={Login} />
              <Route exact path={`${path}/search`} component={Search} />
              <Route exact path={`${path}/create`} component={CreateLink} />
              <Route exact path={`${path}/top`} component={LinkList} />
              <Route exact path={`${path}/new/:page`} component={LinkList} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </>
  );
}
