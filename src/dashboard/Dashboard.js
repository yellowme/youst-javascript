import React from "react";

import Colors from "../core/colors";

import Layout from "./components/Layout";
import Circle from "./components/Circle";
import Title from "./components/Title";
import Subtitle from "./components/Subtitle";
import FeaturesList from "./components/FeaturesList";
import FeatureItem from "./components/FeatureItem";

export default function Dashboard() {
  return (
    <Layout>
      <Circle color={Colors.YELLOWME} />
      <Title as="h5">Welcome to Youst!</Title>
      <Subtitle>
        The player controls a yellow knight riding a flying ostrich or stork,
        from a third-person perspective.
      </Subtitle>
      <FeaturesList>
        <FeatureItem
          color={Colors.PINK_GLAMOUR}
          title="Challenges"
          legend="Interview puzzlers"
        />
        <FeatureItem
          color={Colors.MINT_LEAF}
          title="Playground"
          legend="Proofs of concept"
        />
        <FeatureItem
          color={Colors.JOUST_BLUE}
          title="Mini Apps"
          legend="Let's clone that app"
        />
      </FeaturesList>
    </Layout>
  );
}
