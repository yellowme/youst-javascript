import React from "react";

export default function Link({ description, url }) {
  return (
    <div>
      {description} ({url})
    </div>
  );
}
