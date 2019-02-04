import React from "react";

export default class FacebookProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ready: false };
  }

  componentDidMount() {
    this.init().then(fb => {
      this.setState({ ready: true });
    });
  }

  componentDidUpdate() {
    this.parseXFBML();
  }

  parseXFBML() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  init() {
    return new Promise(resolve => {
      if (window.FB) {
        resolve(window.FB);
        return;
      }

      window.fbAsyncInit = () => {
        window.FB.init({
          xfbml: true,
          version: "v3.2"
        });

        resolve(window.FB);
      };

      if (window.document.getElementById("facebook-jssdk")) {
        return;
      }

      const fjs = window.document.getElementsByTagName("script")[0];
      const js = window.document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";

      fjs.parentNode.insertBefore(js, fjs);
    });
  }

  render() {
    return this.props.children;
  }
}
