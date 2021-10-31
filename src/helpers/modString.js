const modString = (howToModifyOriginalString, append, prepend, erase) => {
  if (howToModifyOriginalString.constructor === String) {
    if (append && !prepend && !erase) {
      return function (originalString) {
        return `${originalString}${howToModifyOriginalString}`;
      };
    } else if (prepend && !append && !erase) {
      return function (originalString) {
        return `${howToModifyOriginalString}${originalString}`;
      };
    } else if (erase && !append && !prepend) {
      return ``;
    }
  } else if (howToModifyOriginalString.constructor === Function) {
    return howToModifyOriginalString;
  }
};

export default modString;
