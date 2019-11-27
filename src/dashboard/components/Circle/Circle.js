import "./Circle.css";

import React from "react";

export default function Circle({ color }) {
  return <div className="Circle" style={{ backgroundColor: color }} />;
}
