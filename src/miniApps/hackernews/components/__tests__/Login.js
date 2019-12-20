import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import { MemoryRouter, Redirect, Route } from "react-router-dom";
import faker from "faker";
import wait from "waait";

import { CREATE_USER_MUTATION } from "../../hooks/useCreateUserMutation";
import { SIGNIN_USER_MUTATION } from "../../hooks/useSigninUserMutation";
import { ALL_LINKS_QUERY } from "../../hooks/useAllLinksQuery";
import { MINI_APP_BASE_ROUTE, LINKS_PER_PAGE } from "../../constants";
import createUser from "../../jest/factories/users";
import createLink from "../../jest/factories/link";
import LinkList from "../LinkList";
import Login from "../Login";
import Link from "../Link";
import createList from "../../jest/createList";

function TestLogin({ mocks }) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[`${MINI_APP_BASE_ROUTE}/login`]}>
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
        <Route exact path={`${MINI_APP_BASE_ROUTE}/login`} component={Login} />
      </MemoryRouter>
    </MockedProvider>
  );
}

test("signup and login", async () => {
  const allLinks = createList(LINKS_PER_PAGE, createLink);
  const token = faker.lorem.word();
  const expectedUser = createUser({
    id: faker.random.uuid(),
    email: faker.internet.email(),
    password: faker.lorem.word()
  });

  const mocks = [
    {
      request: {
        query: CREATE_USER_MUTATION,
        variables: {
          name: expectedUser.name,
          authProvider: {
            email: {
              email: expectedUser.email,
              password: expectedUser.password
            }
          }
        }
      },
      result: {
        data: {
          createUser: {
            id: expectedUser.id
          }
        }
      }
    },
    {
      request: {
        query: SIGNIN_USER_MUTATION,
        variables: {
          email: {
            email: expectedUser.email,
            password: expectedUser.password
          }
        }
      },
      result: {
        data: {
          signinUser: {
            token,
            user: {
              id: expectedUser.id
            }
          }
        }
      }
    },
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

  const component = renderer.create(<TestLogin mocks={mocks} />);

  // toggle login input to singup input
  const displayLoginFormButton = component.root.findByProps({
    className: "pointer button"
  });

  // Login Form
  expect(component).toMatchSnapshot();

  renderer.act(() => {
    displayLoginFormButton.props.onClick();
  });

  // Signup Form
  expect(component).toMatchSnapshot();

  const form = component.root.findByType("form");
  const nameInput = component.root.findByProps({ name: "name" });
  const emailInput = component.root.findByProps({ name: "email" });
  const passwordInput = component.root.findByProps({ name: "password" });

  // fill form
  await renderer.act(async () => {
    nameInput.props.onChange(
      createInputEvent({ name: "name", value: expectedUser.name })
    );

    emailInput.props.onChange(
      createInputEvent({ name: "email", value: expectedUser.email })
    );

    passwordInput.props.onChange(
      createInputEvent({ name: "password", value: expectedUser.password })
    );

    await form.props.onSubmit();
  });

  await renderer.act(async () => {
    await wait(0); // Wait to LinkList query resolves
  });

  // FIXME:
  // const links = component.root.findAllByType(Link);
  // expect(links.length).toBe(allLinks.length);
});

function createInputEvent({ name, value }) {
  return {
    target: { name, value }
  };
}
