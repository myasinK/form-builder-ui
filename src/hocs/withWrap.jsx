import React from "react";

function withWrap(Parent, Child, passTo) {
  return function (props) {
    return (
      <div>
        {true && <Parent {...props} />}
        {true && <Child {...props} />}
      </div>
    );
  };
}

export default withWrap;
