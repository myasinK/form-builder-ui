import Descriptor from "./Descriptor";

export default class ElementCollection {
  constructor(obj = {}) {
    const {
      componentType = "",
      parentId = "",
      componentList = [],
      componentDescriptor = false,
      id = null,
    } = obj;
    this.generateRandN = () => {
      const rand = new Uint16Array(1);
      window.crypto.getRandomValues(rand);
      return rand[0];
      // return;
    };
    this.componentType = componentType; // not a great variable name; collectionName might be a better
    this.componentDescriptor =
      componentDescriptor || new Descriptor(componentType).getJSON();
    this.parentId = parentId;
    this.componentList = componentList;
    this.id = id || `${parentId}-${componentType}-${this.generateRandN()}`;
  }

  getJSON = () => {
    return {
      componentType: this.componentType,
      componentDescriptor: Object.assign({}, this.componentDescriptor),
      parentId: this.parentId,
      componentList: this.componentList,
      id: this.id,
    };
  };
}
