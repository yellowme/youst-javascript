import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import faker from "faker";

import CreateLink, { CREATE_LINK_MUTATION } from "../CreateLink";

function createLinkList(mocks) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateLink />
    </MockedProvider>
  );
}

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(createLinkList(), div);
  ReactDOM.unmountComponentAtNode(div);
});

test("creates a new link with createLink mutation", async () => {
  const createLinkResult = {
    id: faker.random.uuid(),
    description: faker.lorem.words(),
    url: faker.internet.url()
  };

  const mocks = [
    {
      request: {
        query: CREATE_LINK_MUTATION,
        variables: {
          description: createLinkResult.description,
          url: createLinkResult.url
        }
      },
      result: {
        data: {
          createLink: createLinkResult
        }
      }
    }
  ];

  const component = renderer.create(createLinkList(mocks));

  // find the button and simulate a click
  const button = component.root.findByType("button");
  await renderer.act(async () => {
    await button.props.onClick(); // fires the mutation
  });

  const tree = component.toJSON();
  expect(tree.children).toContain("Loading...");
});
