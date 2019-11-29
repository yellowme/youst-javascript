import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LinkList from "./components/LinkList";
import Link from "./components/Link";

export const ALL_LINKS_QUERY = gql`
  {
    allLinks {
      id
      description
      url
    }
  }
`;

export default function HackerNews() {
  const { loading, error, data } = useQuery(ALL_LINKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <LinkList>
        {data.allLinks.map(link => (
          <Link key={link.id} description={link.description} />
        ))}
      </LinkList>
    </>
  );
}
