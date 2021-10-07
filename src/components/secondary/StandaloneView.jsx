import React from "react";
import Paragraph from "../primary/Paragraph";
import EditableData from "./EditableData";
import Header1 from "../primary/Header1";

function StandaloneView({ elementCollection, formHandler, lastClickedOnId }) {
  const type = elementCollection.componentList[0].componentType;
  const RawComponent = (function () {
    switch (type) {
      case "paragraph":
        return Paragraph;
      case "header1":
        return Header1;
      default:
        break;
    }
  })();

  return (
    <div className={"standalone-container"}>
      {elementCollection.componentList.map((el, index) => {
        return (
          <div></div>
          // <EditableData
          //   key={"asfdadf"}
          //   primaryElement={el}
          //   PlainTextComponent={RawComponent}
          //   inputType={"textarea"}
          //   lastClickedOnId={lastClickedOnId}
          //   formHandler={formHandler}
          // />
        );
      })}
    </div>
  );
}

export default StandaloneView;
