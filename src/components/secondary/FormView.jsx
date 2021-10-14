import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Span from "../primary/Span";
import QuestionView from "./QuestionView";
import StandaloneView from "./StandaloneView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
    htmlInnerText: "drop area (for questions/standalone objects)",
    htmlClassAttr: "question-drop-area",
    htmlTagName: "span",
    draggable: false,
  }).getElement();

  if (thereAreObjectsToRender) {
    return form.componentList.map((q, index) => {
      if (q.componentType.includes("question")) {
        return (
          <>
            {index === 0 && (
              <Span
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index }}
              />
            )}
            <Span
              primaryElement={dragElement}
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
              <Span
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index + 1 }}
              />
            }
          </>
        );
      } else if (q.componentType.includes("standalone")) {
        return (
          <>
            {index === 0 && (
              <Span
                primaryElement={dropElement}
                handlers={handlers}
                action={"drop"}
                dragInfo={{ parentId: formId, destinationIndex: index }}
              />
            )}
            <Span
              primaryElement={dragElement}
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
              <Span
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
    return <div className={"form-container"}>Form doesn't exist yet</div>;
  }
}

export default FormView;
