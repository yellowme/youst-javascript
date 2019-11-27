import "./Text.css";

import React from "react";
import classNames from "classnames";

export default function Text({ children, className, ...props }) {
  return (
    <p className={classNames("Text", className)} {...props}>
      {children}
    </p>
  );
}
