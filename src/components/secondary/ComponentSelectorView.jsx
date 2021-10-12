import React from "react";
import { definitions } from "../../model/FormComponentTypes";

function ComponentSelectorView({ handlers }) {
  const formComponentTypesArray = Object.values(definitions.formComponentTypes);

  const innerTextDictionary = definitions.formComponentInnerText; // what to put in the button/selector as user-facing label

  return (
    <div className={"container-form-components"}>
      {formComponentTypesArray.map((ft, index) => (
        <div
          key={`${ft}-${index}`}
          onClick={() => handlers.addFormComponent(ft)}
        >{`${ft} ${innerTextDictionary[ft]}`}</div>
      ))}
    </div>
  );
}

export default ComponentSelectorView;
