import "./FeatureItem.css";

import React from "react";

import Text from "../Text";
import Heading from "../Heading";
import Container from "../Container";
import Spacer from "../Spacer";

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
