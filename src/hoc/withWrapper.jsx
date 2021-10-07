import React from "react";

function withWrapper(WrappedObj) {
  return (props) => {
    return (
      <div className={props.wrapperClassName}>
        <WrappedObj {...props} />
      </div>
    );
  };
}

export default withWrapper;
