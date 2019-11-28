import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import HackerNews from "../HackerNews";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HackerNews />, div);
  ReactDOM.unmountComponentAtNode(div);
});
