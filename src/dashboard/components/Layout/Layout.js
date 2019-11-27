import "./Layout.css";

import React from "react";
import classNames from "classnames";

import Container from "../../../core/components/Container";
import Center from "../../../core/components/Center";
import Page from "../../../core/components/Page";

export default function Layout({ children, className }) {
  return (
    <Page>
      <Center>
        <Container padding="48px 24px"className={classNames("Layout", className)}>
          {children}
        </Container>
      </Center>
    </Page>
  );
}
