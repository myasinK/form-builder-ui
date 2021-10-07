import React from "react";

function QuestionText({ questionObject, lastClickedOnId, handlers }) {
  const [prompt, responses] = questionObject.componentList;
  return (
    <div className={"question-container"}>
      <div className={"prompt-container"}>{prompt.htmlInnerText}</div>
      <div className={"responses-container"}>responses</div>
    </div>
  );
}

export default QuestionText;
