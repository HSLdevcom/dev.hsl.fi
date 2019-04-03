import React from "react";

const spanStyle = {
  display: "block",
  backgroundColor: "white",
  borderRadius: "3px",
  height: 3
};

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      this.props.onChange(this.state.open);
    }
  }

  render() {
    return (
      <button
        style={{
          ...this.props.style,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          border: "none",
          font: "inherit",
          color: "inherit",
          backgroundColor: "transparent",
          padding: 0
        }}
        onClick={() =>
          this.setState(state => {
            return { open: !state.open };
          })
        }
      >
        <span style={spanStyle} />
        <span style={spanStyle} />
        <span style={spanStyle} />
      </button>
    );
  }
}
