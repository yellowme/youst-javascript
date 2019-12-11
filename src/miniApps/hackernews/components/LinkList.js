import React from "react";

import { MINI_APP_BASE_ROUTE, LINKS_PER_PAGE } from "../constants";
import Link from "./Link";
import useAllLinksQuery from "../hooks/useAllLinksQuery";
import useCreateVoteMutation from "../hooks/useCreateVoteMutation";

export default function LinkList({ location, match, history }) {
  const isNewPage = location.pathname.includes("/new");
  const page = parseInt(match.params.page, 10);

  const [allLinks, loading, error] = useAllLinksQuery({ isNewPage, page });
  const [createVote] = useCreateVoteMutation({ isNewPage, page });

  function getLinksToRender() {
    if (isNewPage) return allLinks;
    // Prevent in place mutation
    const rankedLinks = [...allLinks].sort(
      (l1, l2) => l2.votes.length - l1.votes.length
    );

    return rankedLinks;
  }

  function goToPreviousPage() {
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`${MINI_APP_BASE_ROUTE}/new/${previousPage}`);
    }
  }

  function goToNextPage() {
    if (page <= allLinks.length / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`${MINI_APP_BASE_ROUTE}/new/${nextPage}`);
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
          onVote={createVote}
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
