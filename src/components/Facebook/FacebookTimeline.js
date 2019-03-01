import React from "react";

import provideFacebook from "./provideFacebook";

class FacebookTimeline extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.parseXFBML();
  }

  componentDidUpdate() {
    this.parseXFBML();
  }

  parseXFBML = () => {
    if (this.props.FB && this.ref) {
      //https://gist.github.com/RopoMen/29516a94e31455afe9b6
      this.ref.current.classList.remove(
        "fb_iframe_widget",
        "fb_iframe_widget_fluid"
      );

      this.props.FB.XFBML.parse(this.ref.current.parentNode);
    }
  };

  render() {
    return (
      <div
        className="fb-page"
        data-href={`https://www.facebook.com/${this.props.page}`}
        data-tabs="timeline"
        data-height={this.props.height}
        data-width={this.props.width}
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
        style={{ width: "100%", height: "100%" }}
        ref={this.ref}
      >
        <blockquote
          cite={`https://www.facebook.com/${this.props.page}`}
          className="fb-xfbml-parse-ignore"
        >
          <a href={`https://www.facebook.com/${this.props.page}`}>
            {this.props.page}
          </a>
        </blockquote>
      </div>
    );
  }
}

export default provideFacebook(FacebookTimeline);
