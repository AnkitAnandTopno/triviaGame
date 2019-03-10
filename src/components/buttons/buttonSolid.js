import React from "react";
import colors from "../../assets/colors";

class ButtonSolid extends React.Component {
  render() {
    return (
      <div
        onClick={() => this.props.onClick()}
        style={{
          borderRadius: 4,
          backgroundColor: this.props.color,
          fontSize: this.props.fontSize,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          padding: 10
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

ButtonSolid.defaultProps = {
  fontSize: 15,
  color: colors.colorPrimary,
  fontColor: "#333",
  onClick: () => {}
};
export default ButtonSolid;
