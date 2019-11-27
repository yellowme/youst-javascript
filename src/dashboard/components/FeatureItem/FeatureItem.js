import "./FeatureItem.css";

import React from "react";

import Text from "../../../core/components/Text";
import Heading from "../../../core/components/Heading";
import Container from "../../../core/components/Container";
import Spacer from "../../../core/components/Spacer";

export default function FeatureItem({ title, legend, color }) {
  return (
    <Container className="FeatureItem" padding="20px" backgroundColor={color}>
      <Spacer />
      <Heading as="h6" style={{ color: "white" }}>
        {title}
      </Heading>
      <Text style={{ color: "white" }}>{legend}</Text>
    </Container>
  );
}
