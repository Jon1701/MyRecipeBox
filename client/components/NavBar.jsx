import React from 'react';              // React.
import { Link } from 'react-router';    // React Router.
import { connect } from 'react-redux';  // Connects component to Redux store.
import { bindActionCreators } from 'redux'; // Binds actions to component.

// Redux actions.
import { storeToken } from 'actions/token'; // Store token in Redux store.

// Component definition.
class NavBar extends React.Component {
  // Component render.
  render() {
    // Get token in local storage, and redux store.
    const tokenLocalStorage = localStorage.getItem('token');
    const tokenRedux = this.props.token;

    // Load token from local storage if one exists, and no token is in Redux store.
    if (!tokenRedux && tokenLocalStorage) {
      this.props.storeToken(tokenLocalStorage);
    }

    return (
      <div>
        <nav className="navbar-primary">

          <nav className="subnav-left">
            <ul>
              <li className="nav-item cursor-hand">
                <Link className="nav-item-link" to="/">Recipe Box</Link>
              </li>
            </ul>
          </nav>

          <nav className="subnav-right">
            {this.props.token
              ? <LoggedInSubNav />
              : <NotLoggedInSubNav />}
          </nav>

        </nav>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allows access of actions as props.
const mapDispatchToProps = dispatch => (bindActionCreators({ storeToken }, dispatch));

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

// Prop validation.
NavBar.propTypes = {
  token: React.PropTypes.string,
  storeToken: React.PropTypes.func.isRequired,
};

/*
 *
 *
 *  Presentational Components.
 *
 *
 */

// SubNavigation bar for unauthenticated users.
const NotLoggedInSubNav = () => (
  <ul>
    <li className="nav-item cursor-hand">
      <Link className="nav-item-link" to="/login">Login</Link>
    </li>
    <li className="nav-item cursor-hand">
      <Link className="nav-item-link" to="/signup">Sign up</Link>
    </li>
  </ul>
);

// SubNavifation bar for authenticated users.
const LoggedInSubNav = () => (
  <ul>
    <li className="nav-item cursor-hand">
      <Link className="nav-item-link" to="/new_recipe">New Recipe</Link>
    </li>
    <li className="nav-item cursor-hand">
      <Link className="nav-item-link" to="/dashboard">My Recipes</Link>
    </li>
    <li className="nav-item cursor-hand">
      <Link className="nav-item-link" to="/logout">Logout</Link>
    </li>
  </ul>
);
