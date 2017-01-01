// React dependencies.
import React from 'react';
import ReactDOM from 'react-dom';

// React Components.
import App from 'containers/App';

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
  console.log(store.getState());
});

// Application stylesheet.
require("stylesheets/stylesheet.scss");

// Application UI Container.
const ApplicationUIContainer = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

// Render to DOM.
ReactDOM.render(ApplicationUIContainer, document.getElementById('react-target'));
