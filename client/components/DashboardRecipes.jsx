// Dependencies.
import React from 'react';
import request from 'common/request';
import { Link } from 'react-router';
import { connect } from 'react-redux';      // Connects component to Redux store.

// Component definition.
class DashboardRecipes extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // State.
    this.state = {
      loading: true,  // Is the component currently loading.
      pageNum: 1,  // Current page number.
      perPage: 5,   // Number of recipes per page. Server is hardcoded to 20, but may change.
      recipes: [],  // Array of recipes.
    };

    // Bind methods to component instance.
    this.getRecipes = this.getRecipes.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  // Method to get the previous page of results.
  previousPage() {
    // Get the previous page number.
    const prevPageNum = this.state.pageNum - 1;

    // Only go to previous page if the previous page number is at least 1.
    if (prevPageNum >= 1) {
      // Get the next page of recipes.
      this.getRecipes(prevPageNum);
    }
  }

  // Method to get the next page of results.
  nextPage() {
    this.getRecipes(this.state.pageNum + 1);
  }

  // Method to get a page of results.
  getRecipes(pageNum) {
    // Get token from props.
    const token = this.props.token;

    // Get username from props.
    const username = JSON.parse(atob(token.split('.')[1])).username;

    // Get number of recipes per page from state.
    const perPage = this.state.perPage;

    // Build URL to the API server.
    const url = [
      '/api/get_recipes',
      `?username=${username}`,
      `&page_num=${pageNum}`,
      `&per_page=${perPage}`,
      '&sort_by=title',
      '&sort_order=descending',
    ].join('');

    // Get the latest recipes from the server.
    request
      .get(url)
      .then((res) => {
        // Success response handling.
        switch (res.data.code) {

          // Search complete
          case 'RECIPE_SEARCH_COMPLETE': {
            // Get array of recipes.
            const recipes = res.data.payload.recipes;

            /*
             * If results were returned by the server,
             * store them in state,
             * set loading to false to display results,
             * set the current page number.
             */
            if (recipes.length > 0) {
              this.setState({
                loading: false, // Disable loading screen.
                recipes,  // Array of recipes.
                pageNum,  // Current page number.
              });
            }
          }
            break;

          // Default case: do nothing.
          default:
            break;
        }

        // Disable loading screen.
        this.setState({ loading: false });
      })
      .catch((err) => {
        // Do nothing.
      });
  }

  // Component Lifecycle Method.
  componentDidMount() {
    // Get the first page of recipes.
    this.getRecipes(1);
  }

  // Component render.
  render() {
    // If component is currently loading, display loading message.
    if (this.state.loading && this.state.recipes.length === 0) {
      return (<Loading />);
    }

    // If component is not loading, and has no recipes, display message.
    if (!this.state.loading && this.state.recipes.length === 0) {
      return (<NoRecipes />);
    }

    // Generates HTML for each recipe.
    const displayRecipes = this.state.recipes.map((recipe) => {
      // Get recipe ID.
      const recipeID = recipe['_id'];

      return (
        <div className="recipe" key={`recipe-id-${recipeID}`}>
          <Link to={`/view_recipe/${recipeID}`}>{recipe.title}</Link>
        </div>
      );
    });

    // If loading is complete, display recipes.
    return (
      <div className="box shadow text-center widget-dashboardrecipes">
        <div>
          <h3>
            Your most recent recipes:
          </h3>
        </div>

        <div className="container-recipelist">
          {displayRecipes}
        </div>

        <div className="container-inline-buttons">
          <button className="btn btn-default cursor-hand" onClick={this.previousPage}>
            Previous
          </button>

          <button className="btn btn-default">Page {this.state.pageNum}</button>

          <button className="btn btn-default cursor-hand" onClick={this.nextPage}>
            Next
          </button>
        </div>
      </div>
    );
  }

}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(DashboardRecipes);

// Prop validation.
DashboardRecipes.propTypes = {
  token: React.PropTypes.string,
};

/*
 *  Presentational Components.
 */

// Loading screen.
const Loading = () => (
  <div className="box shadow text-center">
    Loading...
  </div>
);

// No Recipes message.
const NoRecipes = () => (
  <div className="box shadow text-center">
    No recipes found.
  </div>
);
