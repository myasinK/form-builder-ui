const VALID_FORM_TYPES = {
  QTEXT: "question-text",
  RTEXT: "responses-text",
  QTEXTTABULAR: "question-text-tabular",
  RTEXTTABULAR_ROWS: "responses-text-tabular-rows",
  RTEXTTABULAR_COLUMNS: "responses-text-tabular-columns",
  QTEXTAREA: "question-textarea",
  RTEXTAREA: "responses-textarea",
  QRADIO: "question-radio",
  RRADIO: "responses-radio",
  QRADIOTABULAR: "question-radio-tabular",
  RRADIOTABULAR_ROWS: "responses-radio-tabular-rows",
  RRADIOTABULAR_COLUMNS: "responses-radio-tabular-columns",
  QCHECKBOX: "question-checkbox",
  RCHECKBOX: "responses-checkbox",
  QCHECKBOXTABULAR: "question-checkbox-tabular",
  RCHECKBOXTABULAR_ROWS: "responses-checkbox-tabular-rows",
  RCHECKBOXTABULAR_COLUMNS: "responses-checkbox-tabular-columns",
  PARAGRAPH: "paragraph",
  HEADER1: "header1",
};

const definitions = {};

definitions.formComponentTypes = {
  QTEXT: "question-text",
  QTEXTTABULAR: "question-text-tabular",
  QTEXTAREA: "question-textarea",
  QRADIO: "question-radio",
  QRADIOTABULAR: "question-radio-tabular",
  QCHECKBOX: "question-checkbox",
  QCHECKBOXTABULAR: "question-checkbox-tabular",
  STANDALONEPARAGRAPH: "standalone-paragraph",
  STANDALONEHEADER1: "standalone-header-1",
};

definitions.formComponentInnerText = {
  [definitions.formComponentTypes.STANDALONEPARAGRAPH]: "Parapraph",
  [definitions.formComponentTypes.QTEXT]: "Short Alphanumeric",
  [definitions.formComponentTypes.QTEXTTABULAR]:
    "Short Alphanumeric (tabulated)",
  [definitions.formComponentTypes.QTEXTAREA]: "Long Alphanumeric",
  [definitions.formComponentTypes.QRADIO]: "Multiple choices 1",
  [definitions.formComponentTypes.QRADIOTABULAR]:
    "Multiple choices 1 (tabulated)",
  [definitions.formComponentTypes.QCHECKBOX]: "Multiple choices",
  [definitions.formComponentTypes.QCHECKBOXTABULAR]:
    "Multiple choices (tabulated)",
  [definitions.formComponentTypes.STANDALONEPARAGRAPH]: "Paragraphs",
  [definitions.formComponentTypes.STANDALONEHEADER1]: "Header 1",
};

definitions.responsesTypes = {
  [definitions.formComponentTypes.QTEXT]: ["responses-text"],
  [definitions.formComponentTypes.QTEXTTABULAR]: [
    "responses-text-tabular-rows",
    "responses-text-tabular-columns",
  ],
  [definitions.formComponentTypes.QTEXTAREA]: ["responses-textarea"],
  [definitions.formComponentTypes.QRADIO]: ["responses-radio"],
  [definitions.formComponentTypes.QRADIOTABULAR]: [
    "responses-radio-tabular-rows",
    "responses-radio-tabular-columns",
  ],
  [definitions.formComponentTypes.QCHECKBOX]: ["responses-checkbox"],
  [definitions.formComponentTypes.QCHECKBOXTABULAR]: [
    "responses-checkbox-tabular-rows",
    "responses-checkbox-tabular-columns",
  ],
  [definitions.formComponentTypes.STANDALONEPARAGRAPH]: [],
  [definitions.formComponentTypes.STANDALONEHEADER1]: [],
};

const possibleResponses = Object.values(definitions.responsesTypes).flat(
  Infinity
);

const possibleQuestionTypes = Object.values(definitions.formComponentTypes);

const allValidTypes = [...possibleQuestionTypes, ...possibleResponses];

const returnInputType = (typeString) => {
  const typeStringDeconstructed = typeString.split("-");
  if (typeString === null) {
    return null;
  } else if (["question", "responses"].includes(typeStringDeconstructed[0])) {
    return typeStringDeconstructed[1];
  } else {
    return null;
  }
};

definitions.endUserHtmlInputType = {};

allValidTypes.map((type) => {
  definitions.endUserHtmlInputType[type] = returnInputType(type);
  return type;
});

export default VALID_FORM_TYPES;
export { definitions };
