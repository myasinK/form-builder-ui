import React from "react";
import EditableData from "./EditableData";

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
        } else if (
          ["h1", "h2", "h3", "h4", "h5", "h6"].includes(component.htmlTagName)
        ) {
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
