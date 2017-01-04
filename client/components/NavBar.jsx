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
                <li className="nav-item">Brand</li>
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
    <li className="nav-item">Login</li>
    <li className="nav-item">Sign up</li>
  </ul>
);

const LoggedInSubNav = () => (
  <ul>
    <li className="nav-item">Username</li>
  </ul>
);
