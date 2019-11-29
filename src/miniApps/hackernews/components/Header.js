import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import { AUTH_TOKEN } from "../constants";

export default function Header() {
  const { path } = useRouteMatch();
  const history = useHistory();

  const authToken = localStorage.getItem(AUTH_TOKEN);

  function handleLogout() {
    localStorage.removeItem(AUTH_TOKEN);
    history.push(path);
  }

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to={path} className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to={`${path}/top`} className="ml1 no-underline black">
          top
        </Link>
        <div className="ml1">|</div>
        <Link to={`${path}/search`} className="ml1 no-underline black">
          search
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to={`${path}/create`} className="ml1 no-underline black">
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
          <Link to={`${path}/login`} className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
}
