import React from "react";

function Input({ primaryElement, handlers, disabled = true }) {
  const {
    // componentType = "not specified",
    // componentDescriptor = {},
    htmlType = "type-not-specified", // input type (bad variable name)
    htmlValueAttr = "value-not-specified",
    htmlClassAttr = "class-not-specified",
    htmlPlaceholderAttr = "placeholder-not-specified",
    htmlNameAttr = "name-not-specified",
    htmlTagName = "optional-field",
    // parentId = null,
  } = primaryElement;
  if (htmlTagName === "textarea" || htmlType === "textarea") {
    return (
      <textarea
        type={htmlType}
        value={htmlValueAttr}
        id={primaryElement.id}
        className={htmlClassAttr}
        placeholder={htmlPlaceholderAttr}
        name={htmlNameAttr}
        onChange={(event) => {
          const propertyValue = event.target.value;
          handlers.updateNamedMemberWithValue(primaryElement.id, {
            propertyName: "htmlInnerText",
            propertyValue,
          });
        }}
        disabled={disabled}
      ></textarea>
    );
  } else {
    return (
      <input
        type={htmlTagName}
        value={htmlValueAttr}
        id={primaryElement.id}
        className={htmlClassAttr}
        placeholder={htmlPlaceholderAttr}
        name={htmlNameAttr}
        disabled={disabled}
        onChange={(event) => {
          const propertyValue = event.target.value;
          handlers.updateNamedMemberWithValue(primaryElement.id, {
            propertyName: "htmlInnerText",
            propertyValue,
          });
        }}
      />
    );
  }
}

export default Input;
