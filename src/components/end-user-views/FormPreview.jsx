import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import QuestionPreview from "./QuestionPreview";
import StandaloneView from "../secondary/StandaloneView";

function FormPreview({ form, handlers }) {
  const thereAreObjectsToRender = form.componentList.length > 0;

  const dragElement = new InterfaceElement({
    htmlInnerText: "drag bar (for questions/standalone objects)",
    htmlClassAttr: "question-drag-bar",
    htmlTagName: "span",
    draggable: true,
  }).getElement();

  if (thereAreObjectsToRender) {
    let questionCount = 0;
    return form.componentList.map((q, index) => {
      if (q.componentType.includes("question")) {
        questionCount++;
        let dragBar = Object.assign({}, dragElement);
        dragBar.htmlInnerText = `#${questionCount}`;
        return (
          <QuestionPreview key={q.id} questionObject={q} handlers={handlers} />
        );
      } else if (q.componentType.includes("standalone")) {
        let dragBar = Object.assign({}, dragElement);
        dragBar.htmlInnerText = "";
        return (
          <StandaloneView key={q.id} standaloneObject={q} handlers={handlers} />
        );
      } else return null;
    });
  } else {
    return null;
  }
}

export default FormPreview;
