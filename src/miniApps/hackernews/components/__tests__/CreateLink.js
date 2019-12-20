import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import { MemoryRouter, Redirect, Route } from "react-router-dom";
import wait from "waait";

import createLink from "../../jest/factories/link";
import CreateLink from "../CreateLink";
import LinkList from "../LinkList";
import Link from "../Link";
import { MINI_APP_BASE_ROUTE } from "../../constants";
import { ALL_LINKS_QUERY } from "../../hooks/useAllLinksQuery";
import { CREATE_LINK_MUTATION } from "../../hooks/useCreateLinkMutation";

function TestCreateLink({ mocks }) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`${MINI_APP_BASE_ROUTE}/create`]}>
        <Route
          exact
          path={MINI_APP_BASE_ROUTE}
          render={() => <Redirect to={`${MINI_APP_BASE_ROUTE}/new/1`} />}
        />
        <Route
          exact
          path={`${MINI_APP_BASE_ROUTE}/new/:page`}
          component={LinkList}
        />
        <Route
          exact
          path={`${MINI_APP_BASE_ROUTE}/create`}
          component={CreateLink}
        />
      </MemoryRouter>
    </MockedProvider>
  );
}

test("creates a new link with createLink mutation", async () => {
  const newLink = createLink();
  const allLinks = [createLink(), newLink];

  const mocks = [
    {
      request: {
        query: CREATE_LINK_MUTATION,
        variables: {
          description: newLink.description,
          url: newLink.url
        }
      },
      result: {
        data: {
          createLink: newLink
        }
      }
    },
    {
      request: {
        query: ALL_LINKS_QUERY,
        variables: {
          first: 5,
          skip: 0,
          orderBy: "createdAt_DESC"
        }
      },
      result: {
        data: {
          allLinks
        }
      }
    }
  ];

  const component = renderer.create(<TestCreateLink mocks={mocks} />);

  // find input fileds
  const form = component.root.findByType("form");
  const descriptionInput = component.root.findByProps({ name: "description" });
  const urlInput = component.root.findByProps({ name: "url" });

  // Fill form
  await renderer.act(async () => {
    descriptionInput.props.onChange(
      createInputEvent({ name: "description", value: newLink.description })
    );

    urlInput.props.onChange(
      createInputEvent({ name: "url", value: newLink.url })
    );

    await form.props.onSubmit();
  });

  await renderer.act(async () => {
    await wait(0); // Wait to LinkList query resolves
  });

  const links = component.root.findAllByType(Link);
  expect(links.length).toBe(allLinks.length);

  const createdLink = links.find(l => l.props.id === newLink.id);
  expect(createdLink.props.description).toBe(newLink.description);
});

function createInputEvent({ name, value }) {
  return {
    target: { name, value }
  };
}
