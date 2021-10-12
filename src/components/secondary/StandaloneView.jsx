import React from "react";
import Paragraph from "../primary/Paragraph";
import EditableData from "./EditableData";
import Header1 from "../primary/Header1";

function StandaloneView({ standaloneObject, lastClickedOnId, handlers }) {
  const { id = null } = standaloneObject;
  return (
    <div className={"standalone-container"}>
      {standaloneObject.componentList.map((component) => {
        if (
          component.htmlTagName === "p" ||
          component.htmlTagName === "paragraph" // because I'm an idiot
        ) {
          return (
            <EditableData
              primaryElement={component}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
          );
        } else if (component.htmlTagName === "h1") {
          return (
            <EditableData
              primaryElement={component}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
          );
        } else {
          return null;
        }
      })}
      <button onClick={() => handlers.delete(id)}>Delete question</button>
    </div>
  );
}

export default StandaloneView;
