// React.
import React from 'react';

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.

// Component definition.
class CustomComponent extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Component state.
    this.state = {
      alert: null,  // Alert Box notification.
    };

    // Bind methods to component instance.
    this.setAlert = this.setAlert.bind(this); // Set current alert.
    this.clearAlert = this.clearAlert.bind(this); // Clear the current alert.
  }

  // Method to set the current alert.
  setAlert(type, message) {
    this.setState({ alert: { type, message } });
  }

  // Method to clear the current alert.
  clearAlert() {
    this.setState({ alert: null });
  }

}

// Component export.
export default CustomComponent;
