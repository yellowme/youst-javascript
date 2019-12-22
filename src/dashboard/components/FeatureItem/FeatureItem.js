import "./FeatureItem.css";

import React from "react";

import Colors from "../../../core/colors";
import Link from "../../../core/components/Link";
import Text from "../../../core/components/Text";
import Heading from "../../../core/components/Heading";
import Container from "../../../core/components/Container";

export default function FeatureItem({ to, title, legend, color }) {
  return (
    <Container className="FeatureItem" padding="20px" backgroundColor={color}>
      <Link to={to}>
        <Heading style={{ color: Colors.WHITE }}>{title}</Heading>
        <Text style={{ color: "white" }}>{legend}</Text>
      </Link>
    </Container>
  );
}
