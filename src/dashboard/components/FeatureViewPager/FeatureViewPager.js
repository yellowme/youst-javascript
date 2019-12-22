import "./FeatureViewPager.css";

import React from "react";

import Container from "../../../core/components/Container";

export default function FeatureViewPager({ children }) {
  return (
    <Container margin="20px 0px 0px" className="FeaturesViewPager">
      {children}
    </Container>
  );
}
