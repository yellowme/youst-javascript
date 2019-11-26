import React from "react";

import FeaturesList from "./components/FeaturesList";
import FeatureItem from "./components/FeatureItem";

export default function Dashboard() {
  return (
    <div>
      <FeaturesList>
        <FeatureItem title="Challenges" />
        <FeatureItem title="Playground" />
        <FeatureItem title="Mini Apps" />
      </FeaturesList>
    </div>
  );
}
