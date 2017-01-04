// Dependencies.
import React from 'react';  // React.
import request from 'common/request'; // HTTP GET/POST functionality.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.

// Component definition.
class LoginWidget extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      alert: null,  // Alert Box notification.
    };

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this); // Form Submit.
    this.handleFormReset = this.handleFormReset.bind(this); // Form Reset.
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

  // Method to handle form submit.
  handleFormSubmit(e) {
    // Prevent default form submit.
    e.preventDefault();

    // Clear any existing alerts.
    this.clearAlert();

    // Get username and password.
    const username = this.inputUsername.value;
    const password = this.inputPassword.value;

    // Send credentials to the server.
    request
      .post('/api/login', { username, password })
      .then((res) => {
        switch (res.data.code) {

          case 'LOGIN_SUCCESS':
            this.setAlert('SUCCESS', 'Login successful.');
            break;
          default:
            break;

        }

        // Clear form.
        this.handleFormReset();
      })
      .catch((err) => {
        // Display error message based on server response.
        switch (err.response.data.code) {
          // Display alert message.
          case 'MISSING_CREDENTIALS':
            this.setAlert('FAILURE', 'Both a username and password are required.');
            break;
          case 'INVALID_CREDENTIALS':
            this.setAlert('FAILURE', 'Incorrect username or password.');
            break;
          case 'NO_USER_FOUND':
            this.setAlert('FAILURE', 'Incorrect username or password.');
            break;
          default:
            break;
        }
      });
  }

  // Method to handle form reset.
  handleFormReset() {
    // Clear fields.
    this.inputUsername.value = '';
    this.inputPassword.value = '';
  }

  // Component render.
  render() {
    return (
      <div className="box shadow text-center">
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <form type="POST" onSubmit={this.handleFormSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="width-100"
            type="text"
            id="username"
            ref={(input) => { this.inputUsername = input; }}
            minLength="8"
            maxLength="25"
          />

          <label htmlFor="password">Password:</label>
          <input
            className="width-100"
            type="password"
            id="password"
            ref={(input) => { this.inputPassword = input; }}
            minLength="8"
            maxLength="50"
          />

          <button type="submit" className="width-100">Login</button>
        </form>
      </div>
    );
  }
}

// Component export.
export default LoginWidget;
