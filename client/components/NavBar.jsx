import React from 'react';  // React.
import { Link } from 'react-router';  // React Router.

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

// Component export.
export default NavBar;

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

const LoggedInSubNav = () => (
  <ul>
    <li className="nav-item nav-item-link cursor-hand">
      <Link to="/dashboard">Login</Link>
    </li>
  </ul>
);
