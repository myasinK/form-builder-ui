import React from "react";

function Div({
  primaryElement,
  handlers,
  action = "standard",
  dragInfo = null,
  modClass = null,
  modId = null,
}) {
  let {
    htmlInnerText = "",
    htmlClassAttr = "class-not-specified",
    draggable,
    id,
  } = primaryElement;
  htmlClassAttr = modClass ? modClass(htmlClassAttr) : htmlClassAttr;
  id = modId ? modId(modId) : id;
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
    const destinationIndex = dragInfo.destinationIndex;
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
