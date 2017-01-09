// Dependencies.
import React from 'react';                  // React.
import { bindActionCreators } from 'redux'; // Binds actions to component.
import { connect } from 'react-redux';      // Connects component to Redux store.

// Redux actions.
import { deleteToken } from 'actions/token'; // Store token in Redux store.

// Component definition.
class LogoutWidget extends React.Component {

  // Component Lifecycle Method.
  componentWillMount() {
    // Delete JSON web token.
    this.props.deleteToken();
  }

  // Component render.
  render() {
    return (
      <div className="box shadow text-center">
        You have been logged out.
      </div>
    );
  }
}

// Allows access of actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ deleteToken }, dispatch));

// Allow component access to Redux store.
export default connect(null, mapDispatchToProps)(LogoutWidget);

// Prop validation.
LogoutWidget.propTypes = {
  deleteToken: React.PropTypes.func,
};
