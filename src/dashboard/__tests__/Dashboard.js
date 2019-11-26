import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import Dashboard from "../Dashboard";
import FeaturesList from "../components/FeaturesList";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("dashboard have 3 main sections", () => {
  // For now we use 3 "static" sections
  // - Challenges
  // - Playgrounds
  // - Mini Apps
  // But the list component should work as a _Compound Component_
  const component = renderer.create(<Dashboard />);

  const featuresList = component.root.findByType(FeaturesList);
  expect(featuresList.children.length).toBe(3);

  const featureChallenges = featuresList.children[0];
  expect(featureChallenges.props.title).toBe("Challenges");

  const featurePlaygrounds = featuresList.children[1];
  expect(featurePlaygrounds.props.title).toBe("Playground");

  const featureMiniApps = featuresList.children[2];
  expect(featureMiniApps.props.title).toBe("Mini Apps");
});
