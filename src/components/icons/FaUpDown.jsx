import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function FaUpDown() {
  let [isHovering, setIsHovering] = useState(false);
  const GRAB = "grab";
  const DEFAULT = "default";
  const cssMoveIconContainer = {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    cursor: isHovering ? GRAB : DEFAULT,
  };
  const cssFaCaretUp = {
    "margin-bottom": "1px",
  };
  const cssFaCaretDown = {
    "margin-top": "1px",
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
        style={cssFaCaretUp}
        className={"fa-caret-up"}
        icon={faCaretUp}
      />
      <FontAwesomeIcon
        style={cssFaCaretDown}
        className={"fa-caret-down"}
        icon={faCaretDown}
      />
    </span>
  );
}

export default FaUpDown;
