import React from "react";
import { definitions } from "../../model/FormComponentTypes";

function ComponentSelectorView({ handlers }) {
  // const form_types = Object.values(VALID_FORM_TYPES).filter(
  //   (type) => !type.includes("responses")
  // );

  const formComponentTypesArray = Object.values(definitions.formComponentTypes);

  const innerTextDictionary = definitions.formComponentInnerText; // what to put in the button/selector as user-facing label

  return (
    <div className={"container-form-components"}>
      {formComponentTypesArray.map((ft) => (
        <div
          onClick={() => handlers.addNewQuestion(ft)}
        >{`${ft} ${innerTextDictionary[ft]}`}</div>
      ))}
    </div>
  );
}

export default ComponentSelectorView;
