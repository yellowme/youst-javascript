import React from "react";
import { Helmet } from "react-helmet";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "https://api.graph.cool/simple/v1/ck3jdh5305isu0175jjcs3ssf"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

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
        <div />
      </ApolloProvider>
    </>
  );
}
