import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { useFormik } from "formik";
import gql from "graphql-tag";

import { MINI_APP_BASE_ROUTE } from "../constants";
import useAuthenticatedUser from "../hooks/useUser";

export default function Login({ history }) {
  const { login } = useAuthenticatedUser();
  const [displayLoginForm, setDisplayForm] = useState(true);
  const [createUserMutation] = useMutation(CREATE_USER_MUTATION);
  const [signinUserMutation] = useMutation(SIGNIN_USER_MUTATION);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: ""
    },
    onSubmit: displayLoginForm
      ? handleSigninUserMutation
      : handleCreateUserMutation
  });

  async function handleCreateUserMutation(variables) {
    const { errors } = await createUserMutation({
      variables: {
        name: variables.name,
        authProvider: {
          email: {
            email: variables.email,
            password: variables.password
          }
        }
      }
    });

    if (errors) throw errors;
    return handleSigninUserMutation(variables);
  }

  async function handleSigninUserMutation(variables) {
    const { data, errors } = await signinUserMutation({
      variables: {
        email: {
          email: variables.email,
          password: variables.password
        }
      }
    });

    if (errors) throw errors;
    const { token: authToken, user } = data.signinUser;
    login({ authToken, userId: user.id });
    history.push(MINI_APP_BASE_ROUTE);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <h4 className="mv3">{displayLoginForm ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!displayLoginForm && (
          <input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          type="text"
          placeholder="Your email address"
        />
        <input
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={formik.handleSubmit}>
          {displayLoginForm ? "login" : "create account"}
        </div>
        <div
          className="pointer button"
          onClick={() => setDisplayForm(!displayLoginForm)}
        >
          {displayLoginForm
            ? "need to create an account?"
            : "already have an account?"}
        </div>
      </div>
    </form>
  );
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $authProvider: AuthProviderSignupData!
  ) {
    createUser(name: $name, authProvider: $authProvider) {
      id
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: AUTH_PROVIDER_EMAIL) {
    signinUser(email: $email) {
      token
      user {
        id
      }
    }
  }
`;
