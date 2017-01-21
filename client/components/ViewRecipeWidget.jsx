// Dependencies.
import React from 'react';                  // React.
import request from 'common/request';       // HTTP GET/POST functionality.
import { withRouter } from 'react-router';  // Allows component to be aware of React Router.
import classNames from 'classnames';        // Toggleable CSS classes.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.

// Component definition.
class ViewRecipeWidget extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      recipe: null, // Recipe data.
      alert: null,  // Alert Box notification.
      loading: true,  // Show loading message.
    };

    // Bind methods to component instance.
    this.setAlert = this.setAlert.bind(this); // Set current alert.
    this.clearAlert = this.clearAlert.bind(this); // Clear the current alert.
  }

  // Component Lifecycle Method.
  componentDidMount() {
    // Get the recipe ID from route.
    const recipeID = this.props.params.recipe_id;

    // If a recipe ID was found, get recipe data from the server.
    if (recipeID) {
      request
        .get(`/api/get_recipes?recipe_id=${recipeID}`)
        .then((res) => {
          // Success response handling.
          switch (res.data.code) {

            // Recipe search complete.
            case 'RECIPE_SEARCH_COMPLETE': {
              // Get number of recipes returned.
              const numRecipes = res.data.payload.recipes.length;

              // If a recipe was found, store it in state.
              if (numRecipes === 1) {
                this.setState({ recipe: res.data.payload.recipes[0] });
              }
            }
              break;

            // Default case: do nothing.
            default:
              break;
          }

          // Disable loading component.
          this.setState({ loading: false });
        })
        .catch((err) => {
          // Error response handling.
          switch (err.response.data.code) {

            // Invalid recipe ID.
            case 'INVALID_RECIPE_ID': {
              this.setAlert('FAILURE', 'No recipe found.');
            }
              break;

            // Default case: do nothing.
            default:
              break;
          }

          // Disable loading component.
          this.setState({ loading: false });
        });
    }
  }

  // Method to set the current alert.
  setAlert(type, message) {
    this.setState({ alert: { type, message } });
  }

  // Method to clear the current alert.
  clearAlert() {
    this.setState({ alert: null });
  }

  // Component render.
  render() {
    // If component is still loading, display loading message.
    if (this.state.loading) {
      return <Loading />;
    }

    // If no recipe was found, display message.
    if (!this.state.recipe) {
      return <NoRecipeFound />;
    }

    // Classes to toggle display of recipe.
    const classesContainer = classNames({
      hidden: this.state.recipe === null, // Hide if no recipe was loaded in state.
      box: true,
      shadow: true,
    });

    // Deconstruct recipe variables.
    const { username, title, tagline, ingredients, instructions } = this.state.recipe;

    // Build a list (<li>) of ingredients.
    const ingredientsItems = ingredients.map((ingredient, index) => (
      <li key={`ingredient-item-${index}`}>{ingredient}</li>
    ));

    // Build a list (<li>) of preparation instructions.
    const instructionsItems = instructions.map((instruction, index) => (
      <li key={`instruction-item-${index}`}>{instruction}</li>
    ));

    return (
      <div>
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <div className={classesContainer}>

          <h1 className="text-center">{title}</h1>

          <p className="text-center">by: {username}</p>

          <p className="text-center">{tagline}</p>

          <h3>Ingregients</h3>
          <ul>
            {ingredientsItems}
          </ul>

          <h3>Preparation Instructions</h3>
          <ol>
            {instructionsItems}
          </ol>
        </div>
      </div>
    );
  }
}

// Allow component access to Redux store.
export default withRouter(ViewRecipeWidget);

// Prop validation.
ViewRecipeWidget.propTypes = {
  params: React.PropTypes.shape({
    recipe_id: React.PropTypes.string,
  }),
};

/*
 *  Presentational Components.
 */

// Loading component.
const Loading = () => (
  <div className="box shadow text-center">
    Loading
  </div>
);

// No recipe found.
const NoRecipeFound = () => (
  <div className="box shadow text-center">
    No recipe found.
  </div>
);
