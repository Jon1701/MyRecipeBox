// Reducer definition.
const tokenReducer = (state = null, action) => {
  switch (action.type) {

    // Stores JSON Web Token in state.
    case 'STORE_TOKEN':
      return action.payload;

    // Deletes JSON Web Token from state.
    case 'DELETE_TOKEN':
      return null;

    // Return empty state by default.
    default:
      return state;
  }
};

// Export reducer.
export default tokenReducer;
