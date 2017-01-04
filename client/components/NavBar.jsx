import React from 'react';

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
                <li className="brand cursor-hand nav-item">Brand</li>
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
    <li className="nav-item nav-item-link cursor-hand">Login</li>
    <li className="nav-item nav-item-link cursor-hand">Sign up</li>
  </ul>
);

const LoggedInSubNav = () => (
  <ul>
    <li className="nav-item nav-item-link cursor-hand">Username</li>
  </ul>
);
