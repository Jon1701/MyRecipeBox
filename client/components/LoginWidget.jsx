// Dependencies.
import React from 'react';                  // React.
import request from 'common/request';       // HTTP GET/POST functionality.
import { bindActionCreators } from 'redux'; // Binds actions to component.
import { connect } from 'react-redux';      // Connects component to Redux store.
import { withRouter } from 'react-router';  // Allows component to be aware of React Router.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.
import CustomComponent from 'components/CustomComponent'; // React component with AlertBox methods.

// Redux actions.
import { storeToken } from 'actions/token'; // Store token in Redux store.

// Component definition.
class LoginWidget extends CustomComponent {

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
    const password = this.inputPassword.value;

    // Send credentials to the server.
    request
      .post('/api/login', { username, password })
      .then((res) => {
        switch (res.data.code) {
          // Login successful.
          case 'LOGIN_SUCCESS': {
            // Set alert box.
            this.setAlert('SUCCESS', 'Login successful. Sending you to your dashboard.');

            // Store token in Redux store.
            this.props.storeToken(res.data.payload.token);

            // Redirect function.
            const redirect = () => {
              this.props.router.replace('/dashboard');
            };

            // Redirect to the dashboard page.
            setTimeout(redirect.bind(this), 2000);
          }
            break;

          // Default.
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

          <div className="container-field">
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

          <div className="container-field">
            <label className="label" htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              id="password"
              ref={(input) => { this.inputPassword = input; }}
              minLength="8"
              maxLength="50"
            />
          </div>

          <button className="btn btn-submit width-100" type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allows access of actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ storeToken }, dispatch));

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginWidget));

// Prop validation.
LoginWidget.propTypes = {
  storeToken: React.PropTypes.func,
};
