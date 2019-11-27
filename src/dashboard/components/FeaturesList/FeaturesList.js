import "./FeaturesList.css";

import React from "react";

import Container from "../../../core/components/Container";

export default function FeaturesList({ children }) {
  return (
    <Container margin="20px 0px 0px" className="FeaturesList">
      {children}
    </Container>
  );
}
