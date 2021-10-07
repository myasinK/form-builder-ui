import React from "react";
import { definitions } from "../../model/FormComponentTypes";

function ComponentSelectorView({ handlers }) {
  // const form_types = Object.values(VALID_FORM_TYPES).filter(
  //   (type) => !type.includes("responses")
  // );

  const formComponentTypes = Object.values(definitions.formComponentTypes);
  const innerTextDictionary = definitions.formComponentInnerText;

  return (
    <div className={"container-form-components"}>
      {formComponentTypes.map((ft) => (
        <div
          onClick={() => handlers.addNewQuestion(ft)}
        >{`${ft} ${innerTextDictionary[ft]}`}</div>
      ))}
    </div>
  );
}

export default ComponentSelectorView;
