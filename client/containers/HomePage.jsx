import React from 'react';
import { Link } from 'react-router';

// Component definition.
const HomePage = () => (
  <div id="container-homepage" className="text-center">

    <div className="container-hero">
      <h1>My Recipe Box</h1>

      <p>Create and share recipes with friends and family!</p>

      <div>
        <Link to="/dashboard" className="btn btn-getstarted">Get Started</Link>
      </div>
    </div>


  </div>
);

// Component export.
export default HomePage;
