import Descriptor from "./Descriptor";
import { definitions } from "./FormComponentTypes";
import PrimaryElement from "./PrimaryElement";

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

  addToComponentList = (objectToInsert) => {
    this.componentList.push(objectToInsert);
    return this;
  };

  fetchObjectWithId = (targetId) => {
    function fetch(targetId, origin, fetchedObj = []) {
      if (origin.id === targetId) {
        return [origin];
      } else {
        const hasTargetObject = origin.componentList
          .map((el) => el.id === targetId)
          .reduce((prev, current) => {
            return prev || current;
          }, false);
        if (hasTargetObject) {
          fetchedObj = origin.componentList.filter(function (el) {
            return el.id === targetId ? true : false;
          });
          return fetchedObj;
        } else {
          origin.componentList.map(function (el) {
            if (el.componentList) {
              fetchedObj = fetch(targetId, el, fetchedObj);
            }
            return el;
          });
        }
        return fetchedObj;
      }
    }

    return fetch(targetId, this.getJSON());
  };

  deleteId = (targetId) => {
    function ejectIdFromCollection(targetId, origin) {
      const hasTargetObject = origin.componentList
        .map((el) => el.id === targetId)
        .reduce((prev, current) => {
          return prev || current;
        }, false);
      if (hasTargetObject) {
        origin.componentList = origin.componentList.filter(function (el) {
          if (el.id === targetId) {
            return false;
          } else {
            return true;
          }
        });
      } else {
        origin.componentList = origin.componentList.map(function (el) {
          if (el.componentList) {
            el = ejectIdFromCollection(targetId, el);
            return el;
          } else {
            return el;
          }
        });
      }
      return origin;
    }
    let origin = Object.assign({}, this.getJSON());
    return ejectIdFromCollection(targetId, origin);
  };

  updateId = (targetId, newObject, updateInstructions) => {
    function updateAtId(
      id,
      updatedObject,
      origin,
      updateInstructions // supply json with propertyName & propertyValue
    ) {
      // if newObject is null and updateInstructions exist, property value of property name is being updated
      // if updateInstructions is null and newObject exists, object at targetId is being replaced with newObject
      const updatingPropertyAtId = () => {
        return updatedObject === null && !(updateInstructions === null);
      };
      let updatedComponentList = origin.componentList.map((el) => {
        if (el.id === id) {
          if (updatingPropertyAtId()) {
            const { propertyName, propertyValue } = updateInstructions;
            el[propertyName] = propertyValue;
            return el;
          } else {
            return updatedObject;
          }
        } else {
          if (el.componentList) {
            return updateAtId(id, updatedObject, el, updateInstructions);
          } else {
            return el;
          }
        }
      });
      origin.componentList = updatedComponentList;
      return { ...origin };
    }

    let origin = Object.assign({}, this.getJSON());
    let updatedCollection = updateAtId(
      targetId,
      newObject,
      origin,
      updateInstructions
    );
    return Object.assign({}, updatedCollection);
  };

  pushToObjectWithId = (payload, targetId) => {
    function pushToComponentListWithId(whatToPush, targetListId, origin) {
      if (origin.id === targetListId) {
        origin.componentList.push(whatToPush);
        return origin;
      } else {
        origin.componentList.map((el) => {
          if (el.componentList) {
            return pushToComponentListWithId(whatToPush, targetListId, el);
          } else {
            return el;
          }
        });
        return origin;
      }
    }
    let origin = Object.assign({}, this.getJSON());
    return pushToComponentListWithId(payload, targetId, origin);
  };

  createNewResponseAndAddToResponses = (responsesId) => {
    const responsesObject = this.fetchObjectWithId(responsesId)[0];
    const updatedResponses = addResponseToResponsesObject(responsesObject);
    return this.updateId(responsesId, updatedResponses);
  };

  createNewQuestionAndAddToForm = (componentType) => {
    const parentId = this.id;
    const newQuestion = generateQuestionObject(componentType, parentId);
    this.addToComponentList(newQuestion);
    return this;
  };

  createNewStandaloneObjectAndAddToForm = (componentType) => {
    const parentId = this.id;
    // const newStandaloneObject;
    const newStandaloneObject = generateStandaloneObject(
      componentType,
      parentId
    );
    this.addToComponentList(newStandaloneObject);
    return this;
  };
}

const generateStandaloneObject = (componentType, parentId) => {
  const newStandaloneObject = new ElementCollection({
    componentType,
    parentId,
  });
  const specificPrimaryElement = new PrimaryElement({
    componentType,
    componentDescriptor: null,
    htmlInnerText: "Click to edit",
    htmlValueAttr: null,
    htmlDefaultValue: null,
    htmlClassAttr: "", // feed through classdictionary
    htmlPlaceholderAttr: null,
    htmlStyleAttr: null,
    htmlNameAttr: null,
    parentId,
    htmlTagName: definitions.standaloneHtmlTagName[componentType],
    conditional: false,
    draggable: false,
    id: false,
  }).getJSON();
  return newStandaloneObject
    .addToComponentList(specificPrimaryElement)
    .getJSON();
};

const generateQuestionObject = (componentType, parentId, seed = true) => {
  const blankQuestion = new ElementCollection({ componentType, parentId });
  const qId = blankQuestion.id;
  // prompt generation and insertion
  const prompt = generatePrompt(qId);
  blankQuestion.addToComponentList(prompt);
  // responses generation and insertion
  const allowedResponseObjects = definitions.responsesTypes[componentType];
  const responsesArray = generateResponsesObjects(qId, allowedResponseObjects);
  if (seed) {
    responsesArray.map((responses) => {
      const responsesCollection = new ElementCollection(responses);
      const parentId = responses.id;
      const response = generateResponseLabelJson({
        componentType,
        parentId,
      });
      responsesCollection.addToComponentList(response).getJSON();
      blankQuestion.addToComponentList(responsesCollection);
    });
    return blankQuestion.getJSON();
  } else {
    return blankQuestion.getJSON();
  }
};

const addResponseToResponsesObject = (responsesObject) => {
  const parentId = responsesObject.id;
  const responseElement = generateResponseLabelJson({ parentId });
  const responsesCollection = new ElementCollection(responsesObject);
  return responsesCollection.addToComponentList(responseElement).getJSON();
};

const generateResponseLabelJson = ({ parentId }) => {
  const componentType = "response-label-editable-text";
  return new PrimaryElement({
    componentType,
    componentDescriptor: null,
    htmlInnerText: "Click to edit",
    htmlValueAttr: null,
    htmlDefaultValue: null,
    htmlClassAttr: "editable response label",
    htmlPlaceholderAttr: null,
    htmlStyleAttr: null,
    htmlNameAttr: null,
    parentId,
    htmlTagName: "span",
    conditional: false,
    draggable: false,
    id: false,
  }).getJSON();
};

const generateResponsesObjects = (parentId, responsesTypeArray) => {
  return responsesTypeArray.map((r) =>
    new ElementCollection({ parentId, componentType: r }).getJSON()
  );
  // returns an array with 1 element unless it's for a tabular response, in which case it will have 2 elements (_.length === 2). Each element is a collection object
};

const generateDisplayInputElement = (endUserHtmlInputType) => {
  const componentType = null;
  const componentDescriptor = null;
  const htmlInnerText = null;
  const htmlValueAttr = null;
  const htmlDefaultValue = null;
  const htmlClassAttr = "display-input";
  const htmlPlaceholderAttr = null;
  const htmlStyleAttr = null;
  const htmlNameAttr = null;
  const parentId = null;
  const htmlTagName = endUserHtmlInputType;
  const conditional = null;
  const draggable = null;
  const id = null;
  return new PrimaryElement({
    componentType,
    componentDescriptor,
    htmlInnerText,
    htmlValueAttr,
    htmlDefaultValue,
    htmlClassAttr,
    htmlPlaceholderAttr,
    htmlStyleAttr,
    htmlNameAttr,
    parentId,
    htmlTagName,
    conditional,
    draggable,
    id,
  }).getJSON();
};

const generatePrompt = (parentId) => {
  const memberObject = {
    componentDescriptor: null,
    componentType: "prompt-editable",
    htmlInnerText: "Click to edit",
    htmlValueAttr: null,
    htmlDefaultValue: null,
    htmlClassAttr: "question-prompt",
    htmlPlaceholderAttr: null,
    htmlStyleAttr: null,
    htmlNameAttr: null,
    parentId,
    htmlTagName: "paragraph",
    conditional: false,
    draggable: false,
    id: false,
  };
  return new PrimaryElement(memberObject).getJSON();
};
