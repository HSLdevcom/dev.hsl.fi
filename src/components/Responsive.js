import React from "react";
import Media from "react-media";

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
        {matches => (matches ? this.props.desktop : this.props.mobile)}
      </Media>
    );
  }
}
