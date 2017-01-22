// Dependencies.
import React from 'react';                  // React.
import request from 'common/request';       // HTTP GET/POST functionality.
import { bindActionCreators } from 'redux'; // Binds actions to component.
import { connect } from 'react-redux';      // Connects component to Redux store.
import { withRouter } from 'react-router';  // Allows component to be aware of React Router.

// Redux actions.
import { storeToken } from 'actions/token'; // Store token in Redux store.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.
import CustomComponent from 'components/CustomComponent'; // React component with AlertBox methods.

// Component definition.
class SignupWidget extends CustomComponent {

  // Component constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this); // Form Submit.
    this.handleFormReset = this.handleFormReset.bind(this); // Form Reset.
  }

  // Method to handle form submit.
  handleFormSubmit(e) {
    // Prevent default form submit.
    e.preventDefault();

    // Clear any existing alerts.
    this.clearAlert();

    // Get username and password.
    const username = this.inputUsername.value;
    const password1 = this.inputPassword1.value;
    const password2 = this.inputPassword2.value;

    // Send credentials to the server.
    request
      .post('/api/signup', { username, password1, password2 })
      .then((res) => {
        switch (res.data.code) {
          // Login successful.
          case 'USER_CREATED': {
            // Set alert box.
            this.setAlert('SUCCESS', 'Your account has been created. You are being logged in.');

            // Log the user in.
            request
              .post('/api/login', { username, password: password1 })
              .then((resLogin) => {
                // Store token in redux store.
                this.props.storeToken(resLogin.data.payload.token);

                // Redirect function.
                const redirect = () => {
                  this.props.router.replace('/dashboard');
                };

                // Redirect to the dashboard page.
                setTimeout(redirect.bind(this), 2000);
              })
              .catch(() => {
                // Ignore errors.
              });
          }
            break;

          // Default.
          default:
            break;
        }
      })
      .catch((err) => {
        // Display error message based on server response.
        switch (err.response.data.code) {
          // Display alert message.
          case 'MISSING_CREDENTIALS':
            this.setAlert('FAILURE', 'No username, password, or password confirmation were provided.');
            break;
          case 'INVALID_USERNAME':
            this.setAlert('FAILURE', 'Invalid username. Only letters, numbers, and underscores, between 8 and 25 characters long.');
            break;
          case 'INVALID_PASSWORD':
            this.setAlert('FAILURE', 'Invalid password. Only letters, numbers, and underscores, between 8 and 50 characters long.');
            break;
          case 'PASSWORD_MISMATCH':
            this.setAlert('FAILURE', 'Passwords do not match.');
            break;
          case 'MISSING_PASSWORD_CONFIRMATION':
            this.setAlert('FAILURE', 'Password confirmation not provided.');
            break;
          case 'USER_EXISTS':
            this.setAlert('FAILURE', 'User already exists.');
            break;
          case 'DB_ERROR':
            this.setAlert('FAILURE', 'Database error.');
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
    this.inputPassword1.value = '';
    this.inputPassword2.value = '';
  }

  // Component render.
  render() {
    return (
      <div className="box shadow text-center">
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <form type="POST" onSubmit={this.handleFormSubmit}>

          <div className="field">
            <label className="label" htmlFor="username">Username:</label>
            <input
              className="input"
              type="text"
              id="username"
              ref={(input) => { this.inputUsername = input; }}
              minLength="8"
              maxLength="25"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              id="password1"
              ref={(input) => { this.inputPassword1 = input; }}
              minLength="8"
              maxLength="50"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Confirm Password:</label>
            <input
              className="input"
              type="password"
              id="password2"
              ref={(input) => { this.inputPassword2 = input; }}
              minLength="8"
              maxLength="50"
            />
          </div>

          <button className="btn btn-submit width-100" type="submit">Create Account</button>
        </form>
      </div>
    );
  }
}

// Allows access of actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ storeToken }, dispatch));


// Allow component access to Redux store.
export default connect(null, mapDispatchToProps)(withRouter(SignupWidget));

// Prop validation.
SignupWidget.propTypes = {
  storeToken: React.PropTypes.func,
};
