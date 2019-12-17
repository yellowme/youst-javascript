import React from "react";
import { Link, useHistory } from "react-router-dom";

import { MINI_APP_BASE_ROUTE } from "../constants";
import useAuthenticatedUser from "../hooks/useUser";

export default function Header() {
  const history = useHistory();
  const { authToken, logout } = useAuthenticatedUser();

  function handleLogout() {
    logout();
    history.push(MINI_APP_BASE_ROUTE);
  }

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to={MINI_APP_BASE_ROUTE} className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link
          to={`${MINI_APP_BASE_ROUTE}/top`}
          className="ml1 no-underline black"
        >
          top
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link
              to={`${MINI_APP_BASE_ROUTE}/create`}
              className="ml1 no-underline black"
            >
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div className="ml1 pointer black" onClick={handleLogout}>
            logout
          </div>
        ) : (
          <Link
            to={`${MINI_APP_BASE_ROUTE}/login`}
            className="ml1 no-underline black"
          >
            login
          </Link>
        )}
      </div>
    </div>
  );
}
