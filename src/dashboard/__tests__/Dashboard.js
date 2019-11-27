import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import Dashboard from "../Dashboard";
import FeaturesList from "../components/FeaturesList";
import Heading from "../components/Heading";
import Text from "../components/Text";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("display application titles", () => {
  const component = renderer.create(<Dashboard />);
  const title = component.root.findAllByType(Heading)[0];
  expect(title.props.children).toBe("Welcome to Youst!");

  const subtitle = component.root.findAllByType(Text)[1];
  expect(subtitle.props.children).toBe(
    "The player controls a yellow knight riding a flying ostrich or stork, from a third-person perspective."
  );
});

test("dashboard have 3 main sections", () => {
  // For now we use 3 "static" sections
  // - Challenges
  // - Playgrounds
  // - Mini Apps
  // But the list component should work as a _Compound Component_
  const component = renderer.create(<Dashboard />);

  const featuresList = component.root.findByType(FeaturesList);
  expect(featuresList.props.children.length).toBe(3);

  const [
    featureChallenges,
    featurePlaygrounds,
    featureMiniApps
  ] = featuresList.props.children;

  expect(featureChallenges.props.title).toBe("Challenges");
  expect(featurePlaygrounds.props.title).toBe("Playground");
  expect(featureMiniApps.props.title).toBe("Mini Apps");
});
