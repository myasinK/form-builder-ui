import React from "react";

function withDroppable(Comp) {
  return function WithDroppable(props) {
    return (
      <div>
        Boo
        <Comp {...props} />
      </div>
    );
  };
}

export default withDroppable;
