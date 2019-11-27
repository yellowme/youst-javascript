import React from "react";

import Colors from "../core/colors";
import Page from "../core/components/Page";
import Center from "../core/components/Center";
import Container from "../core/components/Container";
import Circle from "../core/components/Circle";
import FeaturesList from "../core/components/FeaturesList";
import FeatureItem from "../core/components/FeatureItem";
import Heading from "../core/components/Heading";
import Text from "../core/components/Text";

import Layout from "./components/Layout";

export default function Dashboard() {
  return (
    <Page>
      <Center>
        <Layout>
          <Container padding="24px">
            <Container padding="48px 0px 0px 0px">
              <Container margin="20px 0px 0px">
                <Circle color={Colors.YELLOWME} />
              </Container>
              <Container margin="20px 0px 0px">
                <Heading as="h5">Welcome to Youst!</Heading>
              </Container>
              <Container margin="20px 0px 0px">
                <Text>
                  The player controls a yellow knight riding a flying ostrich or
                  stork, from a third-person perspective.
                </Text>
              </Container>
              <Container margin="20px 0px 0px">
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
              </Container>
            </Container>
          </Container>
        </Layout>
      </Center>
    </Page>
  );
}
