class PrimaryElement {
  constructor(memberObject) {
    const {
      componentType = "not specified",
      componentDescriptor = {},
      htmlInnerText = "",
      htmlValueAttr = "value-not-specified",
      htmlDefaultValue = "default-value-not-specified",
      htmlClassAttr = "class-not-specified",
      htmlPlaceholderAttr = "placeholder-not-specified",
      htmlStyleAttr = "style not specified",
      htmlNameAttr = "name-not-specified",
      parentId = "parent-list-id-not-specified",
      htmlTagName = "optional-field",
      conditional = false,
      draggable = false,
      id = null,
    } = memberObject;
    this.generateRandN = () => {
      const rand = new Uint16Array(1);
      window.crypto.getRandomValues(rand);
      return rand[0];
      // return Math.floor(Math.random() * 10000);
    };
    this.componentDescriptor = componentDescriptor;
    this.componentType = componentType;
    this.htmlInnerText = htmlInnerText;
    this.htmlValueAttr = htmlValueAttr; // Not default value. Usually corresponds to innerHTML
    this.htmlDefaultValue = htmlDefaultValue; // Not default value. Usually corresponds to innerHTML
    this.htmlClassAttr = htmlClassAttr; // class name string
    this.htmlPlaceholderAttr = htmlPlaceholderAttr; // placeholder string, if applicable
    this.htmlStyleAttr = htmlStyleAttr; // object with css properties in json format
    this.htmlNameAttr = htmlNameAttr;
    this.parentId = parentId;
    this.htmlTagName = htmlTagName;
    this.conditional = conditional;
    this.draggable = draggable;
    this.id = id || `${parentId}-${componentType}-${this.generateRandN()}`;
  }
}

export default PrimaryElement;
