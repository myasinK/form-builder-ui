import React from "react";
import Div from "../components/primary/Div";

function withDraggable(Comp) {
  return function ({ handleDragStart, handleDragEnd, ...props }) {
    return (
      <Div
        draggable="true"
        onDragStart={(event) => handleDragStart(event)}
        {...props}
      >
        This is dragable
      </Div>
    );
  };
}

let WithDraggable = withDraggable();
export default WithDraggable;
