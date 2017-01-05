import React from 'react';              // React.
import { Link } from 'react-router';    // React Router.
import { connect } from 'react-redux';  // Connects component to Redux store.

// Component definition.
class NavBar extends React.Component {
  // Component render.
  render() {
    return (
      <div>
        <nav className="navbar-primary">
          <ul>
            <li className="subnav-left">
              <ul>
                <li className="brand cursor-hand nav-item">
                  <Link to="/">Brand</Link>
                </li>
              </ul>
            </li>

            <li className="subnav-right">
              {this.props.token ? <LoggedInSubNav /> : <NotLoggedInSubNav />}
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(NavBar);

// Prop validation.
NavBar.propTypes = {
  token: React.PropTypes.string,
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
    <li className="nav-item nav-item-link cursor-hand">
      <Link to="/login">Login</Link>
    </li>
    <li className="nav-item nav-item-link cursor-hand">
      <Link to="/signup">Sign up</Link>
    </li>
  </ul>
);

// SubNavifation bar for authenticated users.
const LoggedInSubNav = () => (
  <ul>
    <li className="nav-item nav-item-link cursor-hand">
      <Link to="/dashboard">My Recipes</Link>
    </li>
  </ul>
);
