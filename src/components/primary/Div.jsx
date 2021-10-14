import React from "react";

function Div({
  primaryElement,
  handlers,
  action = "standard",
  dragInfo = null,
}) {
  const {
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
    draggable,
    id,
  } = primaryElement;
  if (action === "standard") {
    return (
      <div className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </div>
    );
  } else if (action === "drag") {
    return (
      <div
        onDragStart={() =>
          handlers.handleDragStart(dragInfo.originIndex, dragInfo.parentId)
        }
        draggable={draggable}
        className={htmlClassAttr}
        id={id}
      >
        {htmlInnerText}
      </div>
    );
  } else if (action === "drop") {
    return (
      <div
        onDrop={(event) =>
          handlers.handleOnDrop(event, dragInfo.destinationIndex)
        }
        onDragOver={(event) => handlers.handleOnDragOver(event)}
        className={htmlClassAttr}
        id={id}
      >
        {htmlInnerText}
      </div>
    );
  } else {
    return (
      <div className={htmlClassAttr} id={id}>
        {htmlInnerText}
      </div>
    );
  }
}

export default Div;
