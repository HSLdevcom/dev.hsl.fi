import React from "react";
import Media from "react-media";

export default ({ mobile, desktop }) => (
  <Media query="(min-width: 600px)" defaultMatches={true}>
    {matches => (matches ? desktop : mobile)}
  </Media>
);
