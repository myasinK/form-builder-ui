export default function clickRegistrar(setter) {
  return function (event) {
    event.preventDefault();
    let newIdClicked = event.target.id ? event.target.id : null;
    setter(newIdClicked);
  };
}
