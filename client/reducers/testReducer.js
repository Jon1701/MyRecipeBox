// Reducer definition.
const testReducer = (state = null, action) => {
  switch (action.type) {

    case 'SET_TEST':
      return action.payload;

    // Return empty state by default.
    default:
      return state;
  }
};

// Export reducer.
export default testReducer;
