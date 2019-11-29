import React from "react";

import { timeDifferenceForDate } from "../utils";

import Text from "../../../core/components/Text";

export default function Link({
  id,
  index,
  description,
  url,
  votes,
  postedBy,
  createdAt,
  onVote
}) {
  const handleClick = () => onVote(id);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        <div onClick={handleClick} className="ml1 gray f11">
          ▲
        </div>
      </div>
      <div className="ml1">
        <Text>
          {description} ({url})
        </Text>
        <div className="f6 lh-copy gray">
          {votes} votes | by {postedBy ? postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </div>
  );
}
