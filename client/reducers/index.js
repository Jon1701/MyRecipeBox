// Redux dependencies.
import { combineReducers } from 'redux';  // Combines many reducers into one.

// Reducers.
import testReducer from 'reducers/testReducer'; // Test reducer.

// Combine all reducers into one.
const reducers = combineReducers({
  test: testReducer,
});

// Export the redux state.
export default reducers;
