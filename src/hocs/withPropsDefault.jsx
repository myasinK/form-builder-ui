// import react from "React";

function withProps(Comp) {
  return function WithProps(props) {
    return <Comp {...props} />;
  };
}

export default withProps;
