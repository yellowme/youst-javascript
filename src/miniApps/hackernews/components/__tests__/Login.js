import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import { MemoryRouter, Redirect, Route } from "react-router-dom";
import faker from "faker";
import wait from "waait";

import { CREATE_USER_MUTATION } from "../../hooks/useCreateUserMutation";
import { SIGNIN_USER_MUTATION } from "../../hooks/useSigninUserMutation";
import { ALL_LINKS_QUERY } from "../../hooks/useAllLinksQuery";
import { MINI_APP_BASE_ROUTE } from "../../constants";
import createUser from "../../jest/factories/users";
import createLink from "../../jest/factories/link";
import LinkList from "../LinkList";
import Login from "../Login";
import Link from "../Link";

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
  const allLinks = [createLink(), createLink()];

  const token = faker.lorem.word();
  const expectedUser = createUser({
    id: faker.random.uuid(),
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

  const component = renderer.create(<TestLogin mocks={mocks} />);

  // toggle login input to singup input
  const displayLoginFormButton = component.root.findByProps({
    className: "pointer button"
  });

  await renderer.act(async () => {
    await displayLoginFormButton.props.onClick();
  });

  const form = component.root.findByType("form");
  const nameInput = component.root.findByProps({ name: "name" });
  const emailInput = component.root.findByProps({ name: "email" });
  const passwordInput = component.root.findByProps({ name: "password" });

  await renderer.act(async () => {
    await nameInput.props.onChange({
      target: { name: "name", value: expectedUser.name }
    });

    await emailInput.props.onChange({
      target: { name: "email", value: expectedUser.email }
    });

    await passwordInput.props.onChange({
      target: { name: "password", value: expectedUser.password }
    });

    await form.props.onSubmit();
  });

  component.update(<TestLogin mocks={mocks} />);

  await renderer.act(async () => {
    await wait(0); // Wait to LinkList query resolves
  });

  // Navigates back to LinkList
  const links = component.root.findAllByType(Link);
  expect(links.length).toBe(allLinks.length);
});
