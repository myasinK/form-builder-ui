import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function FaLeftRight() {
  let [isHovering, setIsHovering] = useState(false);
  const GRAB = "grab";
  const DEFAULT = "default";
  const cssMoveIconContainer = {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    cursor: isHovering ? GRAB : DEFAULT,
  };
  const cssFaCaretLeft = {
    "margin-right": "1px",
  };
  const cssFaCaretRight = {
    "margin-left": "1px",
  };
  return (
    <span
      className={"up-down move-icon-container"}
      style={cssMoveIconContainer}
      draggable={true}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <FontAwesomeIcon
        style={cssFaCaretLeft}
        className={"fa-caret-left"}
        icon={faCaretLeft}
      />
      <FontAwesomeIcon
        style={cssFaCaretRight}
        className={"fa-caret-right"}
        icon={faCaretRight}
      />
    </span>
  );
}

export default FaLeftRight;
