import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_MIN_APPS_HACKER_NEWS_GRAPHQL_URI
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
