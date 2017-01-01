// React.
import React from 'react';

// Component definition.
const App = (props) => (
  <div>
    Hello World
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
