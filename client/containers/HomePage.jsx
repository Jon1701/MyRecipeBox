import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

// Component definition.
const HomePage = () => (
  <div id="container-homepage" className="text-center">

    <div className="container-hero">
      <h1>My Recipe Box</h1>

      <p>Create and share recipes with friends and family!</p>

      <div>
        <button type="button" className="btn btn-getstarted" onClick={() => { browserHistory.push('/dashboard'); }}>
          Get Started
        </button>
      </div>
    </div>


  </div>
);

// Component export.
export default HomePage;
