import React from "react";
import QuestionView from "./QuestionView";
import StandaloneView from "./StandaloneView";

function FormView({ form, lastClickedOnId, handlers }) {
  const thereAreObjectsToRender = form.componentList.length > 0;
  if (thereAreObjectsToRender) {
    return form.componentList.map((q) => {
      if (q.componentType.includes("question")) {
        return (
          <QuestionView
            key={q.id}
            questionObject={q}
            lastClickedOnId={lastClickedOnId}
            handlers={handlers}
          />
        );
      } else if (q.componentType.includes("standalone")) {
        return (
          <StandaloneView
            key={q.id}
            standaloneObject={q}
            lastClickedOnId={lastClickedOnId}
            handlers={handlers}
          />
        );
      } else return null;
    });
  } else {
    return <div className={"form-container"}>Form doesn't exist yet</div>;
  }
}

export default FormView;
