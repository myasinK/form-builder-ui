import React from "react";

function Input({
  primaryElement,
  handlers,
  disabled = true,
  modClass = null,
  modId = null,
  handleOnChangeAnswer = null,
  labelId = null,
  value = false,
}) {
  let {
    // componentType = "not specified",
    // componentDescriptor = {},
    htmlType = "type-not-specified", // input type (bad variable name)
    htmlValueAttr = "value-not-specified",
    htmlClassAttr = "class-not-specified",
    htmlPlaceholderAttr = "placeholder-not-specified",
    htmlNameAttr = "name-not-specified",
    htmlTagName = "optional-field",
    id,
    // parentId = null,
  } = primaryElement;
  htmlClassAttr = modClass ? modClass(htmlClassAttr) : htmlClassAttr;
  const modifiedId = modId ? modId(modId) : labelId;
  if (htmlTagName === "textarea" || htmlType === "textarea") {
    return (
      <textarea
        type={htmlTagName}
        // value={answer ? answer.value : htmlValueAttr}
        id={id}
        className={htmlClassAttr}
        placeholder={htmlPlaceholderAttr}
        name={htmlNameAttr}
        onChange={(event) => {
          if (handleOnChangeAnswer) {
            handleOnChangeAnswer(event.target.id);
          } else {
            handlers.updateNamedMemberWithValue(primaryElement.id, {
              propertyName: "htmlInnerText",
              propertyValue: event.target.value,
            });
          }
        }}
        disabled={disabled}
      ></textarea>
    );
  } else {
    return (
      <input
        type={htmlTagName}
        value={value ? value : htmlValueAttr}
        id={modifiedId}
        className={htmlClassAttr}
        placeholder={htmlPlaceholderAttr}
        name={htmlNameAttr}
        disabled={disabled}
        onChange={(event) => {
          const propertyValue = event.target.value;
          if (handleOnChangeAnswer) {
            handleOnChangeAnswer({
              id: labelId,
              value: event.target.value,
            });
          } else {
            handlers.updateNamedMemberWithValue(primaryElement.id, {
              propertyName: "htmlInnerText",
              propertyValue,
            });
          }
        }}
      />
    );
  }
}

export default Input;
