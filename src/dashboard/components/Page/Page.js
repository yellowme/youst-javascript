import "./Page.css";

import React from "react";
import classNames from "classnames";

import Container from "../Container";

export default function Page({ children, className }) {
  return (
    <Container className={classNames("Page", className)}>{children}</Container>
  );
}
