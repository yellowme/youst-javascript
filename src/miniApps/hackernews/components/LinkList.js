import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { LINKS_PER_PAGE, AUTH_TOKEN, USER_ID } from "../constants";
import Link from "./Link";

export default function LinkList({ location, match, history }) {
  const isNewPage = location.pathname.includes("new");
  const page = parseInt(match.params.page, 10);

  const [mutate] = useMutation(CREATE_VOTE_MUTATION);
  const { loading, error, data } = useQuery(ALL_LINKS_QUERY, {
    variables: getQueryVariables()
  });

  function handleVoteMutation(linkId) {
    const hasToken = localStorage.getItem(AUTH_TOKEN);
    const userId = localStorage.getItem(USER_ID);
    if (!hasToken) return history.push(`/mini-apps/hacker-news/login`);

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

  function getQueryVariables() {
    const page = parseInt(match.params.page, 10);

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

  function getLinksToRender() {
    if (isNewPage) return data.allLinks;
    // Prevent in place mutation
    const rankedLinks = [...data.allLinks].sort(
      (l1, l2) => l2.votes.length - l1.votes.length
    );

    return rankedLinks;
  }

  function goToPreviousPage() {
    const page = parseInt(match.params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  }

  function goToNextPage() {
    const page = parseInt(match.params.page, 10);
    if (page <= data.allLinks.length / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {getLinksToRender().map((link, index) => (
        <Link
          id={link.id}
          key={link.id}
          url={link.url}
          index={index}
          description={link.description}
          votes={link.votes.length}
          postedBy={link.postedBy}
          createdAt={link.createdAt}
          onVote={handleVoteMutation}
        />
      ))}
      {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <div className="pointer mr2" onClick={goToPreviousPage}>
            Previous
          </div>
          <div className="pointer" onClick={goToNextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  );
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
