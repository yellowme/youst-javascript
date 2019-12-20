import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LINKS_PER_PAGE } from "../constants";
import { ALL_LINKS_QUERY } from "./useAllLinksQuery";
import useAuthenticatedUser from "./useAuthenticatedUser";

export default function useCreateVoteMutation({ isNewPage, page }) {
  const { authToken, userId } = useAuthenticatedUser();
  const [mutate] = useMutation(CREATE_VOTE_MUTATION);

  function createVote(linkId) {
    if (!authToken) throw new Error();

    return mutate({
      mutation: CREATE_VOTE_MUTATION,
      variables: { linkId, userId },
      update: (store, { data: { createVote } }) => {
        let skip = 0;
        let first = 100;
        let orderBy = null;

        if (isNewPage) {
          skip = (page - 1) * LINKS_PER_PAGE;
          first = LINKS_PER_PAGE;
          orderBy = "createdAt_DESC";
        }

        const data = store.readQuery({
          query: ALL_LINKS_QUERY,
          variables: { first, skip, orderBy }
        });

        const votedLink = data.allLinks.find(link => link.id === linkId);
        votedLink.votes.push(createVote);
        store.writeQuery({ query: ALL_LINKS_QUERY, data });
      }
    });
  }

  return [createVote];
}

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($linkId: ID, $userId: ID) {
    createVote(linkId: $linkId, userId: $userId) {
      id
      user {
        id
      }
    }
  }
`;
