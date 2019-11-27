import "./Container.css";

import React from "react";
import classNames from "classnames";

export default function Container({
  children,
  margin,
  padding,
  backgroundColor,
  flex,
  className,
  ...props
}) {
  return (
    <div
      className={classNames("Container", className)}
      style={{ margin, padding, backgroundColor, flex }}
      {...props}
    >
      {children}
    </div>
  );
}
