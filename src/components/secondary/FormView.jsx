import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Div from "../primary/Div";
import QuestionView from "./QuestionView";
import StandaloneView from "./StandaloneView";

function FormView({ form, lastClickedOnId, handlers }) {
  const thereAreObjectsToRender = form.componentList.length > 0;

  const formId = form.id;

  const dragElement = new InterfaceElement({
    htmlInnerText: "drag bar (for questions/standalone objects)",
    htmlClassAttr: "question-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  const dropElement = new InterfaceElement({
    htmlInnerText: "",
    htmlClassAttr: "question-drop-area",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  if (thereAreObjectsToRender) {
    let questionCount = 0;
    return form.componentList.map((q, index) => {
      if (q.componentType.includes("question")) {
        questionCount++;
        let dragBar = Object.assign({}, dragElement);
        dragBar.htmlInnerText = `#${questionCount}`;
        return (
          <>
            {index === 0 && (
              <Div
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index }}
              />
            )}
            <Div
              primaryElement={dragBar}
              handlers={handlers}
              action={"drag"}
              dragInfo={{ parentId: formId, originIndex: index }}
            />
            <QuestionView
              key={q.id}
              questionObject={q}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
            {
              <Div
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index + 1 }}
              />
            }
          </>
        );
      } else if (q.componentType.includes("standalone")) {
        let dragBar = Object.assign({}, dragElement);
        dragBar.htmlInnerText = "";
        return (
          <>
            {index === 0 && (
              <Div
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index }}
              />
            )}
            <Div
              primaryElement={dragBar}
              handlers={handlers}
              action={"drag"}
              dragInfo={{ parentId: formId, originIndex: index }}
            />
            <StandaloneView
              key={q.id}
              standaloneObject={q}
              lastClickedOnId={lastClickedOnId}
              handlers={handlers}
            />
            {
              <Div
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index + 1 }}
              />
            }
          </>
        );
      } else return null;
    });
  } else {
    // if there are no objects to render
    return <div className={"no-form"}>Form doesn't exist yet</div>;
  }
}

export default FormView;
