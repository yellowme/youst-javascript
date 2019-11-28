import React from "react";
import { Helmet } from "react-helmet";

export default function HackerNews() {
  return (
    <>
      <Helmet>
        <title>HackerNews</title>
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      </Helmet>
    </>
  );
}
