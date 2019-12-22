import React from "react";

import Container from "../../core/components/Container";
import Heading from "../../core/components/Heading";

export default function Title({ children }) {
  return (
    <Container margin="20px 0px 0px">
      <Heading as="h5">{children}</Heading>
    </Container>
  );
}
