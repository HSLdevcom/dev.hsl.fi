import React from "react";

export default props => (
  <div
    className="fb-page"
    data-href={`https://www.facebook.com/${props.page}`}
    data-tabs="timeline"
    data-height={props.height}
    data-width={props.width}
    data-small-header="true"
    data-adapt-container-width="true"
    data-hide-cover="false"
    data-show-facepile="false"
  >
    <blockquote
      cite={`https://www.facebook.com/${props.page}`}
      className="fb-xfbml-parse-ignore"
    >
      <a href={`https://www.facebook.com/${props.page}`}>{props.page}</a>
    </blockquote>
  </div>
);
