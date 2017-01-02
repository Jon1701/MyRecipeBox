// React.
import React from 'react';

// Component definition.
const App = (props) => (
  <div>
    <a href="/api/auth/twitter">Log In</a>
  </div>
);

// Component export.
export default App;

// Prop validation.
App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};
