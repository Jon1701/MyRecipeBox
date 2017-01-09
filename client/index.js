// React dependencies.
import React from 'react';
import ReactDOM from 'react-dom';

// React Components.
import App from 'containers/App';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import NewRecipePage from 'containers/NewRecipePage';
import ViewRecipePage from 'containers/ViewRecipePage';
import EditRecipePage from 'containers/EditRecipePage';
import Dummy from 'components/Dummy';

// React Router dependencies.
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Redux dependencies.
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers and store.
import reducers from 'reducers/index.js';
const store = createStore(reducers);

// Subscribe to state changes.
store.subscribe(() => {
  // Get the token in state.
  const token = store.getState().token;

  // Store/delete token in local storage depending if it is stored in Redux store..
  try {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  } catch (e) {
    // Do nothing.
  }

  console.log(store.getState());
});

// Application stylesheet.
require("stylesheets/stylesheet.scss");

// Application UI Container.
const ApplicationUIContainer = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/new_recipe' component={NewRecipePage} />
          <Route path='/view_recipe/:recipe_id' component={ViewRecipePage} />
          <Route path='/edit_recipe/:recipe_id' component={EditRecipePage} />
      </Route>
    </Router>
  </Provider>
);

// Render to DOM.
ReactDOM.render(ApplicationUIContainer, document.getElementById('react-target'));
