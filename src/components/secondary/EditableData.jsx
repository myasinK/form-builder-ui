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
  const generateInputElementFromLabel = (responseLabelElement, inputType) => {
    return new InterfaceElement({
      componentType: null,
      parentId: null,
      htmlValueAttr: responseLabelElement.htmlInnerText,
      htmlTagName: inputType,
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

  const [PlainTextComponent, inputType] =
    determinePlainTextComponentAndInputType(primaryElement.htmlTagName);

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
        {inputType === "textarea" && didUserLastClickOnSelf && (
          <textarea
            id={selfId}
            onChange={(event) =>
              handlers.updateNamedMemberWithValue(selfId, {
                propertyName: "htmlInnerText",
                propertyValue: event.target.value,
              })
            }
            value={primaryElement.htmlInnerText}
          ></textarea>
        )}
        {inputType === "text" && didUserLastClickOnSelf && (
          <input
            id={selfId}
            onChange={(event) =>
              handlers.updateNamedMemberWithValue(selfId, {
                propertyName: "htmlInnerText",
                propertyValue: event.target.value,
              })
            }
            value={primaryElement.htmlInnerText}
          />
        )}
      </>
    );
  }
}

export default EditableData;
const WrappedEditableObj = withWrapper(EditableData);
export { WrappedEditableObj };
