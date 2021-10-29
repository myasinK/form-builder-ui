class PrimaryElement {
  constructor(memberObject) {
    const {
      componentDescriptor = false,
      componentType = "not specified",
      conditional = false,
      draggable = false,
      htmlClassAttr = "class-not-specified",
      htmlDefaultValue = "default-value-not-specified",
      htmlInnerText = "",
      htmlNameAttr = "name-not-specified",
      htmlPlaceholderAttr = "",
      htmlStyleAttr = "style not specified",
      htmlTagName = "optional-field",
      htmlValueAttr = "value-not-specified",
      id = null,
      parentId = "parent-list-id-not-specified",
    } = memberObject;
    this.generateRandN = () => {
      const rand = new Uint16Array(1);
      window.crypto.getRandomValues(rand);
      return rand[0];
      // return Math.floor(Math.random() * 10000);
    };
    this.componentDescriptor = componentDescriptor;
    this.componentType = componentType;
    this.conditional = conditional;
    this.draggable = draggable;
    this.htmlClassAttr = htmlClassAttr; // class name string
    this.htmlDefaultValue = htmlDefaultValue; // Not default value. Usually corresponds to innerHTML
    this.htmlInnerText = htmlInnerText;
    this.htmlPlaceholderAttr = htmlPlaceholderAttr; // placeholder string, if applicable
    this.htmlStyleAttr = htmlStyleAttr; // object with css properties in json format
    this.htmlValueAttr = htmlValueAttr; // Not default value. Usually corresponds to innerHTML
    this.htmlNameAttr = htmlNameAttr;
    this.htmlTagName = htmlTagName;
    this.id = id || `${parentId}-${componentType}-${this.generateRandN()}`;
    this.isRequired = false;
    this.minCharLength = null;
    this.minValue = null;
    this.maxCharLength = null;
    this.maxValue = null;
    this.parentId = parentId;
    this.scoreValue = null;
  }

  getJSON = () => {
    return {
      componentDescriptor: Object.assign({}, this.componentDescriptor || false),
      componentType: this.componentType,
      htmlInnerText: this.htmlInnerText,
      htmlValueAttr: this.htmlValueAttr,
      htmlDefaultValue: this.htmlDefaultValue,
      htmlClassAttr: this.htmlClassAttr,
      htmlPlaceholderAttr: this.htmlPlaceholderAttr,
      htmlStyleAttr: this.htmlStyleAttr,
      htmlNameAttr: this.htmlNameAttr,
      parentId: this.parentId,
      htmlTagName: this.htmlTagName,
      conditional: this.conditional,
      draggable: this.draggable,
      id: this.id,
      scoreValue: this.scoreValue,
      minCharLength: this.minCharLength,
      minValue: this.minValue,
      maxCharLength: this.maxCharLength,
      maxValue: this.maxValue,
    };
  };
}

export default PrimaryElement;
