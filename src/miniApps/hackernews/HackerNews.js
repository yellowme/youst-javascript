import React from "react";
import { Helmet } from "react-helmet";
import { ApolloProvider } from "react-apollo";
import { Switch, Route, Redirect } from "react-router-dom";

import { client } from "./apollo";
import { MINI_APP_BASE_ROUTE } from "./constants";
import LinkList from "./components/LinkList";
import CreateLink from "./components/CreateLink";
import Header from "./components/Header";
import Login from "./components/Login";

export default function HackerNews() {
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
                path={MINI_APP_BASE_ROUTE}
                render={() => <Redirect to={`${MINI_APP_BASE_ROUTE}/new/1`} />}
              />
              <Route exact path={`${MINI_APP_BASE_ROUTE}/login`} component={Login} />
              <Route exact path={`${MINI_APP_BASE_ROUTE}/create`} component={CreateLink} />
              <Route exact path={`${MINI_APP_BASE_ROUTE}/top`} component={LinkList} />
              <Route exact path={`${MINI_APP_BASE_ROUTE}/new/:page`} component={LinkList} />
            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </>
  );
}
