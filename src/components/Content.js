import React from "react";

import typography from "../utils/typography";

const { rhythm } = typography;

export default ({ style, children }) => (
  <div
    style={{
      background: "white",
      borderRadius: rhythm(2 / 3),
      padding: rhythm(2 / 3),
      marginTop: rhythm(2 / 3),
      ...style
    }}
  >
    {children}
  </div>
);
