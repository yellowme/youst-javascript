import React from "react";

import Container from "../../core/components/Container";
import Text from "../../core/components/Text";

export default function Subtitle({ children }) {
  return (
    <Container margin="20px 0px 0px">
      <Text>{children}</Text>
    </Container>
  );
}
