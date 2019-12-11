import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LINKS_PER_PAGE } from "../constants";

export default function useAllLinksQuery({ page, isNewPage }) {
  const { data = { allLinks: [] }, error, loading } = useQuery(
    ALL_LINKS_QUERY,
    {
      variables: getQueryVariables()
    }
  );

  function getQueryVariables() {
    let skip = 0;
    let first = 100;
    let orderBy = null;

    if (isNewPage) {
      skip = (page - 1) * LINKS_PER_PAGE;
      first = LINKS_PER_PAGE;
      orderBy = "createdAt_DESC";
    }

    return { first, skip, orderBy };
  }

  return [data.allLinks, loading, error];
}

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;
