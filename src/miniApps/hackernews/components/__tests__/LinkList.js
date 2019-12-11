import { MemoryRouter, Route, Redirect } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import wait from "waait";

import createLink from "../../jest/factories/link";
import createVote from "../../jest/factories/votes";
import LinkList from "../LinkList";
import Link from "../Link";
import { MINI_APP_BASE_ROUTE } from "../../constants";
import { ALL_LINKS_QUERY } from "../../hooks/useAllLinksQuery";

function TestLinkList({ mocks = [] }) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[MINI_APP_BASE_ROUTE]}>
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
      </MemoryRouter>
    </MockedProvider>
  );
}

test("renders without crashing", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<TestLinkList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders linklist", async () => {
  const allLinks = [createLink(), createLink()];

  const mocks = [
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

  const component = renderer.create(<TestLinkList mocks={mocks} />);
  const root = component.root;
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

  const links = root.findAllByType(Link);
  expect(links.length).toBe(2);

  expect(links[0].props.id).toBe(allLinks[0].id);
  expect(links[1].props.id).toBe(allLinks[1].id);
});

test("renders top links", async () => {
  const allLinks = Array.from({ length: 100 }).map(createLink);

  // Adds and deletes one vote for 2 diferent links
  // Validate sort function
  // The Link with most votes should be the first
  // And the Link with less votes should be the last
  allLinks[0].votes.push(createVote());
  allLinks[1].votes.pop();

  const mocks = [
    {
      request: {
        query: ALL_LINKS_QUERY,
        variables: {
          first: 100,
          skip: 0,
          orderBy: null
        }
      },
      result: {
        data: {
          allLinks
        }
      }
    }
  ];

  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`${MINI_APP_BASE_ROUTE}/top`]}>
        <Route exact path={`${MINI_APP_BASE_ROUTE}/top`} component={LinkList} />
      </MemoryRouter>
    </MockedProvider>
  );

  const root = component.root;
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

  const links = root.findAllByType(Link);
  expect(links.length).toBe(100);

  expect(links[0].props.id).toBe(allLinks[0].id);
  expect(links[99].props.id).toBe(allLinks[1].id);
});

test("navigates to next page and to previous page", async () => {
  const initialAllLinks = Array.from({ length: 5 }).map(createLink);
  const lastAllLinks = Array.from({ length: 5 }).map(createLink);

  const mocks = [
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
          allLinks: initialAllLinks
        }
      }
    },
    {
      request: {
        query: ALL_LINKS_QUERY,
        variables: {
          first: 5,
          skip: 5,
          orderBy: "createdAt_DESC"
        }
      },
      result: {
        data: {
          allLinks: lastAllLinks
        }
      }
    }
  ];

  const component = renderer.create(<TestLinkList mocks={mocks} />);
  const root = component.root;
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

  let links = root.findAllByType(Link);
  expect(links.length).toBe(5);
  expect(links[0].props.id).toBe(initialAllLinks[0].id);

  // Navigates to next 5
  const nextPageButton = root.findByProps({ className: "pointer" });

  await renderer.act(async () => {
    await nextPageButton.props.onClick(); // wait for response
    tree = component.toJSON(); // refresh tree instance
  });

  links = root.findAllByType(Link);
  expect(links.length).toBe(5);
  expect(links[0].props.id).toBe(lastAllLinks[0].id);

  // Go back to previous page
  const previousPageButton = root.findByProps({ className: "pointer mr2" });

  await renderer.act(async () => {
    await previousPageButton.props.onClick(); // wait for response
    tree = component.toJSON(); // refresh tree instance
  });

  links = root.findAllByType(Link);
  expect(links.length).toBe(5);
  expect(links[0].props.id).toBe(initialAllLinks[0].id);
});
