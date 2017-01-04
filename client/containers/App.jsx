// React.
import React from 'react';

// React Components.
import NavBar from 'components/NavBar';

// Component definition.
const App = props => (
  <div>
    <NavBar />
    {props.children}
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
