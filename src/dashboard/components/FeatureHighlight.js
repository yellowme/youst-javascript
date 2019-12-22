import React from "react";
import { Redirect } from 'react-router-dom'

import Colors from "../../core/colors";

import Layout from "../components/Layout";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import FeatureItem from "../components/FeatureItem";
import FeaturesList from "../components/FeaturesList";

export default function FeatureHighlight({ match }) {
  const { path } = match;

  return (
    <Layout>
      <Title as="h5">{featureTitle[path]}</Title>
      <Subtitle>{featureSubtitle[path]}</Subtitle>
      <FeaturesList>
        <HighlightList path={path} />
      </FeaturesList>
    </Layout>
  );
}

function HighlightList({ path }) {
  switch (path) {
    case "/playground":
      return [
        <FeatureItem
          to="/playground/pokedex-context-hooks"
          color={Colors.PINK_GLAMOUR}
          title="Pokedex"
          legend="Global state management with context and useReducer"
        />
      ];
    case "/mini-apps":
      return [
        <FeatureItem
          to="/mini-apps/hacker-news"
          color={Colors.MINT_LEAF}
          title="Hacker News"
          legend="Simple clone of Hackernews. Based on the HowToGraphql tutorial"
        />
      ];
    default:
      return <Redirect to="/" />
  }
}

const featureTitle = {
  "/mini-apps": "Mini Apps! 📲",
  "/playground": "This is out Playground! 🎡"
};

const featureSubtitle = {
  "/mini-apps":
    "You can easily get all sort of app concepts provide here. Watch out! You could find some famous app clones.",
  "/playground":
    "An outdoor area provided for all to play in. Feel free to try out any development tool you are interested in."
};
