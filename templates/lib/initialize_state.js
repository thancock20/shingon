export default ({LocalState}, initialState) => {
  for (let key in initialState) {
    if (initialState.hasOwnProperty(key)) {
      LocalState.set(key, initialState[key]);
    }
  }
};
