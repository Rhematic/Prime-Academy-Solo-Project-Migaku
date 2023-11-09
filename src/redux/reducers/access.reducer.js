const accessReducer = (state = "LOGIN", action) => {
  switch (action.type) {
    case "SET_ACCESS_VIEW":
      return action.payload;
    default:
      return state;
  }
};

export default accessReducer;
