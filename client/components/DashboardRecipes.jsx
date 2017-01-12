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

  previousPage() {
    // Get the current page number.
    const { pageNum } = this.state;

    // Get the previous page number.
    const prevPageNum = pageNum - 1;

    // Only go to previous page if the previous page number is at least 1.
    if (prevPageNum >= 1) {
      // Get the next page of recipes.
      this.getRecipes(prevPageNum);

      // Update page number in state.
      this.setState({ pageNum: prevPageNum });
    }
  }

  nextPage() {
    // Get current page number, and recipes array.
    const { pageNum, recipes } = this.state;

    // Get next page number.
    const nextPageNum = pageNum + 1;

    if (recipes.length > 0) {
      // Get the next page of recipes.
      this.getRecipes(nextPageNum);

      // Update page number in state.
      this.setState({ pageNum: nextPageNum });
    }
  }

  getRecipes(pageNum) {
    // Get token from props.
    const token = this.props.token;

    // Get username from props.
    const username = JSON.parse(atob(token.split('.')[1])).username;

    // Get number of recipes per page from state.
    const perPage = this.state.perPage;

    // Build URL to the API server.
    const url = [
      `/api/get_recipes`,
      `?username=${username}`,
      `&page_num=${pageNum}`,
      `&per_page=${perPage}`,
      `&sort_by=title`,
      `&sort_order=descending`,
    ].join('');

    // Get the latest recipes from the server.
    request
      .get(url)
      .then((res) => {
        // Success response handling.
        switch (res.data.code) {

          // Search complete
          case 'RECIPE_SEARCH_COMPLETE': {
            // Store recipes in state, set loading to false.
            this.setState({
              recipes: res.data.payload.recipes,
              loading: false,
            });
          }
            break;

          // Default case: do nothing.
          default:
            break;
        }
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
    if (this.state.loading) {
      return (<div className="text-center">Loading</div>);
    }

    const displayRecipes = this.state.recipes.map((recipe) => {
      // Get recipe ID.
      const recipeID = recipe['_id'];

      return (
        <div className="tbl-row btn-hover" key={`recipe-id-${recipeID}`}>
          <Link to={`/view_recipe/${recipeID}`}>{recipe.title}</Link>
        </div>
      );
    });

    // If loading is complete, display recipes.
    return (
      <div className="widget-dashboard-recipes box shadow">
        <div>
          <h3 className="text-center">
            Your most recent recipes:
          </h3>
        </div>

        <div className="tbl cursor-hand">
          {displayRecipes}
        </div>

        <div className="container-prev-next">
          <a
            className="btn btn-hover cursor-hand"
            onClick={this.previousPage}
          >
            Previous
          </a>

          <a className="btn">Page {this.state.pageNum}</a>

          <a
            className="btn btn-hover cursor-hand"
            onClick={this.nextPage}
          >
            Next
          </a>
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
