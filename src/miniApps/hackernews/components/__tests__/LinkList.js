import { MemoryRouter, Route, Redirect } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";

import { ALL_LINKS_QUERY } from "../../hooks/useAllLinksQuery";
import { MINI_APP_BASE_ROUTE, LINKS_PER_PAGE } from "../../constants";
import createList from "../../jest/createList";
import createLink from "../../jest/factories/link";
import createVote from "../../jest/factories/votes";
import Link from "../Link";
import LinkList from "../LinkList";

function TestLinkList({ initialEntries = [MINI_APP_BASE_ROUTE], mocks = [] }) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={initialEntries}>
        <Route
          exact
          path={MINI_APP_BASE_ROUTE}
          render={() => <Redirect to={`${MINI_APP_BASE_ROUTE}/new/1`} />}
        />
        <Route exact path={`${MINI_APP_BASE_ROUTE}/top`} component={LinkList} />
        <Route
          exact
          path={`${MINI_APP_BASE_ROUTE}/new/:page`}
          component={LinkList}
        />
      </MemoryRouter>
    </MockedProvider>
  );
}

test("renders link list", async () => {
  const allLinks = [createLink(), createLink()];

  const mocks = [
    {
      request: {
        query: ALL_LINKS_QUERY,
        variables: {
          first: LINKS_PER_PAGE,
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

  let tree = component.toJSON();
  // Loading after query response it renders a loading state
  expect(tree.children).toContain("Loading...");

  // When the query resolves it sets an state in the
  // apollo provider with the fetched information
  // for our component it will behave as a side-effect
  // and for our test we should capture that side effect
  await renderer.act(async () => {
    await wait(0); // wait for response
  });

  const links = component.root.findAllByType(Link);
  expect(links.length).toBe(2);

  for (let i = 0; i < links.length; i++) {
    expect(links[i].props.id).toBe(allLinks[i].id);
  }
});

test("renders top links", async () => {
  // 100 defaults when request top links
  const allLinks = createList(100, createLink);

  // Adds and deletes one vote for 2 diferent links
  // to validate sort function
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
    <TestLinkList
      initialEntries={[`${MINI_APP_BASE_ROUTE}/top`]}
      mocks={mocks}
    />
  );

  await renderer.act(async () => {
    await wait(0); // wait for response
  });

  const links = component.root.findAllByType(Link);
  expect(links.length).toBe(100);

  expect(links[0].props.id).toBe(allLinks[0].id);
  expect(links[99].props.id).toBe(allLinks[1].id);
});

test("navigates to next page and to previous page", async () => {
  const firstPageAllLinks = createList(LINKS_PER_PAGE, createLink);
  const secondPageAllLinks = createList(LINKS_PER_PAGE, createLink);

  const mocks = [
    {
      request: {
        query: ALL_LINKS_QUERY,
        variables: {
          first: LINKS_PER_PAGE,
          skip: 0,
          orderBy: "createdAt_DESC"
        }
      },
      result: {
        data: {
          allLinks: firstPageAllLinks
        }
      }
    },
    {
      request: {
        query: ALL_LINKS_QUERY,
        variables: {
          first: LINKS_PER_PAGE,
          skip: LINKS_PER_PAGE,
          orderBy: "createdAt_DESC"
        }
      },
      result: {
        data: {
          allLinks: secondPageAllLinks
        }
      }
    }
  ];

  const component = renderer.create(<TestLinkList mocks={mocks} />);

  await renderer.act(async () => {
    await wait(0); // wait for response
  });

  let links = component.root.findAllByType(Link);
  expect(links.length).toBe(5);
  expect(links[0].props.id).toBe(firstPageAllLinks[0].id);

  // Navigates to next 5
  const nextPageButton = component.root.findByProps({ className: "pointer" });

  await renderer.act(async () => {
    await nextPageButton.props.onClick(); // wait for response
  });

  links = component.root.findAllByType(Link);
  expect(links.length).toBe(5);
  expect(links[0].props.id).toBe(secondPageAllLinks[0].id);

  // Go back to previous page
  const previousPageButton = component.root.findByProps({
    className: "pointer mr2"
  });

  await renderer.act(async () => {
    await previousPageButton.props.onClick(); // wait for response
  });

  links = component.root.findAllByType(Link);
  expect(links.length).toBe(5);
  expect(links[0].props.id).toBe(firstPageAllLinks[0].id);
});
