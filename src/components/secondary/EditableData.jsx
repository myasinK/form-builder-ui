import React from "react";
import Input from "../primary/Input";
import InterfaceElement from "../../Interface/InterfaceElement";
import Paragraph from "../primary/Paragraph";
import Span from "../primary/Span";
import withWrapper from "../../hoc/withWrapper";
import Header from "../primary/Header";

function EditableData({
  primaryElement = null,
  lastClickedOnId = null,
  handlers = null,
}) {
  const generateInputElementFromLabel = (
    responseLabelElement,
    inputTagName
  ) => {
    return new InterfaceElement({
      componentType: null,
      parentId: null,
      htmlValueAttr: responseLabelElement.htmlInnerText,
      htmlTagName: inputTagName,
      id: responseLabelElement.id,
    }).getElement();
  };

  const determinePlainTextComponentAndInputType = (tagName) => {
    if (tagName === "paragraph" || tagName === "p") {
      return [Paragraph, "textarea"];
    } else if (tagName === "span") {
      return [Span, "text"];
    } else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
      return [Header, "text"];
    }
  };

  const PlainTextComponent = determinePlainTextComponentAndInputType(
    primaryElement.htmlTagName
  )[0];

  const inputTagName = determinePlainTextComponentAndInputType(
    primaryElement.htmlTagName
  )[1];

  const selfId = primaryElement.id;
  const didUserLastClickOnSelf = selfId === lastClickedOnId;

  if (primaryElement === null) {
    return null;
  } else {
    return (
      <>
        {!didUserLastClickOnSelf && (
          <PlainTextComponent primaryElement={primaryElement} />
        )}
        {didUserLastClickOnSelf && (
          <Input
            handlers={handlers}
            primaryElement={generateInputElementFromLabel(
              primaryElement,
              inputTagName
            )}
            handleOnChangeAnswer={false}
            disabled={false}
          />
        )}
      </>
    );
  }
}

export default EditableData;
const WrappedEditableObj = withWrapper(EditableData);
export { WrappedEditableObj };
