import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import faker from "faker";
import wait from "waait";

import LinkList, { ALL_LINKS_QUERY } from "../LinkList";

function createLinkList(mocks) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <LinkList />
    </MockedProvider>
  );
}

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(createLinkList(), div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders linklist", async () => {
  const mocks = [
    {
      request: {
        query: ALL_LINKS_QUERY
      },
      result: {
        data: {
          allLinks: [
            {
              id: faker.random.uuid(),
              description: faker.lorem.words(),
              url: faker.internet.url()
            },
            {
              id: faker.random.uuid(),
              description: faker.lorem.words(),
              url: faker.internet.url()
            }
          ]
        }
      }
    }
  ];

  const component = renderer.create(createLinkList(mocks));
  let tree = component.toJSON();

  expect(tree.children).toContain("Loading...");

  // When the query resolves it sets an state in the
  // apollo provider with the fetched information
  // for our component it will behave as a side-effect
  // and for our test we should capture that side effect
  await renderer.act(async () => {
    await wait(0); // wait for response
    tree = component.toJSON(); // refresh tree instance
  });

  expect(tree.children.length).toBe(2);
});
