import { useMutation } from "react-apollo";
import gql from "graphql-tag";

import { ALL_LINKS_QUERY } from "./useAllLinksQuery";
import { LINKS_PER_PAGE } from "../constants";

export default function useCreateLinkMutation() {
  const [mutate] = useMutation(CREATE_LINK_MUTATION);

  function createLink({ description, url }) {
    return mutate({
      variables: { description, url },
      update: (store, { data: { createLink } }) => {
        const first = LINKS_PER_PAGE;
        const skip = 0;
        const orderBy = "createdAt_DESC";

        let data;

        try {
          data = store.readQuery({
            query: ALL_LINKS_QUERY,
            variables: { first, skip, orderBy }
          });
        } catch {
          // No ALL_LINKS_QUERY was loaded before
          return;
        }

        data.allLinks.unshift(createLink);

        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data,
          variables: { first, skip, orderBy }
        });
      }
    });
  }

  return [createLink];
}

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
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
