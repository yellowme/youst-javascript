import React from "react";

import Colors from "./colors";

import Page from "./components/Page";
import Center from './components/Center'
import Layout from "./components/Layout";
import Container from "./components/Container";
import Circle from "./components/Circle";
import FeaturesList from "./components/FeaturesList";
import FeatureItem from "./components/FeatureItem";
import Heading from "./components/Heading";
import Text from "./components/Text";

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
                <Heading>Welcome to Youst!</Heading>
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
