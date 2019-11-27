import React from "react";

import Container from "./Container";

export default function Spacer({ flex = 1 }) {
  return <Container style={{ flex }} />;
}
