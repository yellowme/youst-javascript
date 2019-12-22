import './Link.css'

import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Link({ children, ...props }) {
  return <RouterLink className="Link" {...props}>{children}</RouterLink>;
}
