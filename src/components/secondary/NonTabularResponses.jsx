import React from "react";
import InterfaceElement from "../../Interface/InterfaceElement";
import Button from "../primary/Button";
import ResponseContainer from "./ResponseContainer";

function NonTabularResponses({ responses, lastClickedOnId, formHandler }) {
  const responseInputType = responses.id.split("-")[4];
  const isTabular = responses.id.includes("tabular");
  const isTextarea = responses.id.includes("textarea");
  const addResponseOptionInstructions = {
    action: "add-response-option",
    questionType: `question-${responseInputType}`,
    targetId: responses.id,
  };
  const btn = new InterfaceElement({
    componentDescriptor: addResponseOptionInstructions,
    htmlInnerText: "Add response option",
    componentType: "button",
  }).getElement();

  const displayOnlyInput = responses.componentDescriptor.displayElement;

  return (
    <div className={"multiple-responses-container"}>
      {/* can be refactored. Should not need conditional rendering. Better way would be to initialize the object properly to have the "display element" */}
      {!isTabular && isTextarea && (
        <ResponseContainer
          primaryObject={null}
          // displayElement={displayElement}
          lastClickedOnId={lastClickedOnId}
          formHandler={formHandler}
        />
      )}
      {!isTabular &&
        !isTextarea &&
        responses.componentList.length > 0 &&
        responses.componentList.map((r) => {
          return (
            <ResponseContainer
              key={r.id}
              primaryObject={r}
              displayElement={displayOnlyInput}
              // displayElement={displayElement}
              lastClickedOnId={lastClickedOnId}
              formHandler={formHandler}
            />
          );
        })}
      {!isTextarea && (
        <Button
          primaryElement={btn}
          onBtnClick={formHandler}
          isBtnDisabled={false}
        />
      )}
    </div>
  );
}

export default NonTabularResponses;
