import React from "react";
import classNames from "classnames";

export default function LazyImage({ className, src, ...props }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img data-src={src} className={classNames(className, "lozad")} {...props} />;
}
