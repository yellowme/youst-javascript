import "./Circle.css";

import React from "react";

import Container from "../../../core/components/Container";

export default function Circle({ color }) {
  return (
    <Container margin="20px 0px 0px">
      <div className="Circle" style={{ backgroundColor: color }} />
    </Container>
  );
}
