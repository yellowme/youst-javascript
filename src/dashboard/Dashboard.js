import React from "react";

import FeaturesList from "./components/FeaturesList";
import FeatureItem from "./components/FeatureItem";
import Title from "./components/Title";
import Subtitle from "./components/Subtitle";

export default function Dashboard() {
  return (
    <div>
      <Title>Welcome to Youst!</Title>
      <Subtitle>
        The player controls a yellow knight riding a flying ostrich or stork,
        from a third-person perspective.
      </Subtitle>
      <FeaturesList>
        <FeatureItem title="Challenges" />
        <FeatureItem title="Playground" />
        <FeatureItem title="Mini Apps" />
      </FeaturesList>
    </div>
  );
}
