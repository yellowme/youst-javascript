import React, { useState } from "react";
import { useFormik } from "formik";

import { MINI_APP_BASE_ROUTE } from "../constants";
import useAuthenticatedUser from "../hooks/useUser";
import useSigninUserMutation from "../hooks/useSigninUserMutation";
import useCreateUserMutation from "../hooks/useCreateUserMutation";

export default function Login({ history }) {
  const { login } = useAuthenticatedUser();
  const createUser = useCreateUserMutation();
  const signinUser = useSigninUserMutation();
  const [displayLoginForm, setDisplayForm] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: ""
    },
    onSubmit: handleSubmit
  });

  async function handleSubmit(variables) {
    try {
      if (!displayLoginForm) {
        await handleCreateUserMutation(variables);
      }

      const { data } = await handleSigninUserMutation(variables);
      const { token: authToken, user } = data.signinUser;
      login({ authToken, userId: user.id });
      history.push(MINI_APP_BASE_ROUTE);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCreateUserMutation(variables) {
    return createUser({
      name: variables.name,
      email: variables.email,
      password: variables.password
    });
  }

  function handleSigninUserMutation(variables) {
    return signinUser({
      email: variables.email,
      password: variables.password
    });
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
