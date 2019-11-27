import "./Layout.css";

import React from "react";
import classNames from "classnames";

import Container from "../../../core/components/Container";

export default function Layout({ children, className }) {
  return (
    <Container className={classNames("Layout", className)}>
      {children}
    </Container>
  );
}
