import { useEffect, useState } from "react";

import { AUTH_TOKEN, USER_ID } from "../constants";

export default function useAuthenticatedUser() {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const userId = localStorage.getItem(USER_ID);

    setAuthToken(authToken);
    setUserId(userId);
  }, []);

  function logout() {
    localStorage.removeItem(AUTH_TOKEN);
  }

  function login({ authToken, userId }) {
    localStorage.setItem(AUTH_TOKEN, authToken);
    localStorage.setItem(USER_ID, userId);
  }

  return { authToken, userId, logout, login };
}
