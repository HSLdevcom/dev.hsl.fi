import React from "react";

const provideFB = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { FB: undefined };
    }

    componentDidMount() {
      new Promise(resolve => {
        if (window.FB) {
          resolve(window.FB);
          return;
        }

        window.fbAsyncInit = () => {
          window.FB.init({
            xfbml: false,
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
        js.src = "https://connect.facebook.net/en_US/sdk.js";

        fjs.parentNode.insertBefore(js, fjs);
      }).then(FB => this.setState({ FB }));
    }

    render() {
      return <WrappedComponent FB={this.state.FB} {...this.props} />;
    }
  };
};

export default provideFB;
