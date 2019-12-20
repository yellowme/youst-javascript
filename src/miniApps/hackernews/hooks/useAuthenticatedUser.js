import { useEffect, useState } from "react";

import { AUTH_TOKEN, USER_ID } from "../constants";

export default function useAuthenticatedUser() {
  const [credentials, setCredentials] = useState({
    authToken: null,
    userId: null
  });

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const userId = localStorage.getItem(USER_ID);
    setCredentials({ authToken, userId });
  }, []);

  function logout() {
    localStorage.removeItem(AUTH_TOKEN);
    setCredentials({ authToken: null, userId: null });
  }

  function login({ authToken, userId }) {
    localStorage.setItem(AUTH_TOKEN, authToken);
    localStorage.setItem(USER_ID, userId);
    setCredentials({ authToken, userId });
  }

  return { ...credentials, logout, login };
}
