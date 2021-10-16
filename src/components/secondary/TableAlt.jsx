import React from "react";

function TableAlt({ responses, handlers, lastClickedOnId }) {
  const rows = responses.componentList[0];
  const columns = responses.componentList[1];
  const { displayElement } = rows.componentDescriptor;
  return <div></div>;
}

export default TableAlt;
