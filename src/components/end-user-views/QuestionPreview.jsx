import React, { useState } from "react";
import { WrappedEditableObj } from "../secondary/EditableData";
import ResponsesContainer from "../secondary/ResponsesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCog } from "@fortawesome/free-solid-svg-icons";

function QuestionPreview({ questionObject, lastClickedOnId, handlers }) {
  const { endUserHtmlInputType } = questionObject.componentDescriptor;

  const [prompt, ...responses] = questionObject.componentList;
  // responses is going to be an array

  return (
    <div className={""}>
      <WrappedEditableObj
        wrapperClassName={"prompt-container"}
        primaryElement={prompt}
        lastClickedOnId={lastClickedOnId}
        handlers={handlers}
      />
      <div className={"responses-container"}>
        <ResponsesContainer
          responses={responses}
          lastClickedOnId={lastClickedOnId}
          handlers={handlers}
        />
      </div>
    </div>
  );
}

export default QuestionPreview;
