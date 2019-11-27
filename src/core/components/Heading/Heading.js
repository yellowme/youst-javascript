import "./Heading.scss";

import React from "react";
import classNames from "classnames";

import Text from "../Text";

export default function Heading({
  children,
  as,
  Component: TextComponent = Text,
  ...props
}) {
  return (
    <TextComponent className={classNames("Heading", as)} {...props}>
      {children}
    </TextComponent>
  );
}
