import React from "react";
import { definitions } from "../../model/FormComponentTypes";
import Div from "../primary/Div";

function ComponentSelectorView({ handlers }) {
  const formComponentTypesArray = Object.values(definitions.formComponentTypes);

  const innerTextDictionary = definitions.formComponentInnerText; // what to put in the button/selector as user-facing label

  return (
    <div className={"container-form-components"}>
      <div className={"selector-btn"} id={"start-new-form"} onClick={() => handlers.startNewForm()}>
        Start new form
      </div>
      <div className={"selector-btn"} id={"clear-form"} onClick={() => handlers.clearForm()}>
        Clear form
      </div>
      {formComponentTypesArray.map((ft, index) => (
        <div
          className={"selector-btn"}
          key={`${ft}-${index}`}
          onClick={() => handlers.addFormComponent(ft)}
        >{`${ft} ${innerTextDictionary[ft]}`}</div>
      ))}
    </div>
  );
}

export default ComponentSelectorView;
