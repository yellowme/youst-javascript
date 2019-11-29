import React from "react";
import ReactDOM from "react-dom";

import HackerNews from "../HackerNews";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HackerNews />, div);
  ReactDOM.unmountComponentAtNode(div);
});
