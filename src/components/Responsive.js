import React from "react";
import Media from "react-media";

const isFunction = obj => typeof obj === "function";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { client: 0 };
  }

  componentDidMount() {
    this.setState({ client: 1 });
  }

  render() {
    return (
      <Media
        key={this.state.client}
        query="(min-width: 768px)"
        defaultMatches={true}
      >
        {matches =>
          this.props.children && isFunction(this.props.children)
            ? this.props.children(matches)
            : matches
            ? this.props.desktop
            : this.props.mobile
        }
      </Media>
    );
  }
}
