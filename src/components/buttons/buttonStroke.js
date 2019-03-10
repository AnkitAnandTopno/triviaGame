import React from "react";
import colors from "../../assets/colors";

class ButtonStroke extends React.Component {
  render() {
    return (
      <div
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: this.props.color,
          borderStyle: "solid",
          fontSize: this.props.fontSize,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          padding: 10
        }}
        onClick={() => {
          this.props.onClick();
        }}
      >
        <span
          style={{
            color: this.props.fontColor,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {this.props.children}
        </span>
      </div>
    );
  }
}

ButtonStroke.defaultProps = {
  fontSize: 15,
  fontColor: colors.colorPrimary,
  color: colors.colorPrimary,
  onClick: () => {}
};
export default ButtonStroke;
