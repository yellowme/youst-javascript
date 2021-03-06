import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Dashboard from "../Dashboard";
import FeaturesList from "../components/FeaturesList";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";

function TestDashboardComponent() {
  return (
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
}

test("display application titles", () => {
  const component = renderer.create(<TestDashboardComponent />);
  const title = component.root.findByType(Title);
  expect(title.props.children).toBe("Welcome to Youst!");

  const subtitle = component.root.findByType(Subtitle);
  expect(subtitle.props.children).toBe(
    "The player controls a yellow knight riding a flying ostrich or stork, from a third-person perspective."
  );
});

test("dashboard have 2 main sections", () => {
  // For now we use 3 "static" sections
  // - Playgrounds
  // - Mini Apps
  // But the list component should work as a _Compound Component_
  const component = renderer.create(<TestDashboardComponent />);

  const featuresList = component.root.findByType(FeaturesList);
  expect(featuresList.props.children.length).toBe(2);

  const [
    featurePlaygrounds,
    featureMiniApps
  ] = featuresList.props.children;

  expect(featurePlaygrounds.props.title).toBe("Playground");
  expect(featureMiniApps.props.title).toBe("Mini Apps");
});
