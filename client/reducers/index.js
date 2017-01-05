// Redux dependencies.
import { combineReducers } from 'redux';  // Combines many reducers into one.

// Reducers.
import tokenReducer from 'reducers/reducer_token'; // Test reducer.

// Combine all reducers into one.
const reducers = combineReducers({
  token: tokenReducer,  // this.state.token
});

// Export the redux state.
export default reducers;
