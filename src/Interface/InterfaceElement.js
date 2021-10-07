import PrimaryElement from "../model/PrimaryElement";

export default class InterfaceElement extends PrimaryElement {
  getElement = () => {
    return {
      componentType: this.componentType || null,
      componentDescriptor: this.componentDescriptor || null,
      id: this.id || null,
      htmlInnerText: this.htmlInnerText,
      htmlValueAttr: this.htmlValueAttr || null,
      htmlDefaultValue: this.htmlDefaultValue || null,
      htmlClassAttr: this.htmlClassAttr || null,
      htmlPlaceholderAttr: this.htmlPlaceholderAttr || null,
      htmlStyleAttr: this.htmlStyleAttr || null,
      htmlNameAttr: this.htmlNameAttr || null,
      parentId: this.parentId || null,
      htmlTagName: this.htmlTagName || null,
      conditional: this.conditional || null,
      draggable: this.draggable || null,
    };
  };

  setParentId = (parentId) => {
    this.parentId = parentId;
    this.id = this.resetId();
    return this;
  };

  getProperty = (propertyName) => {
    return this[propertyName];
  };

  updateProperty = (propertyName, newPropertyValue) => {
    this[propertyName] = newPropertyValue;
    return this.getElement();
  };
}
