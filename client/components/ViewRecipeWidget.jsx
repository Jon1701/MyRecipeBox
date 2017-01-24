// Dependencies.
import React from 'react';                  // React.
import request from 'common/request';       // HTTP GET/POST functionality.
import { Link, withRouter } from 'react-router';  // Allows component to be aware of React Router.
import classNames from 'classnames';        // Toggleable CSS classes.
import { connect } from 'react-redux';      // Connects component to Redux store.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.
import CustomComponent from 'components/CustomComponent'; // React component with AlertBox methods.

// Component definition.
class ViewRecipeWidget extends CustomComponent {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      recipe: null, // Recipe data.
      loading: true,  // Show loading message.
    };
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

    // Deconstruct recipe variables.
    const { username, title, tagline, ingredients, instructions, image } = this.state.recipe;

    // Build a list (<li>) of ingredients.
    const ingredientsItems = ingredients.map((ingredient, index) => (
      <li key={`ingredient-item-${index}`}>{ingredient}</li>
    ));

    // Build a list (<li>) of preparation instructions.
    const instructionsItems = instructions.map((instruction, index) => (
      <li key={`instruction-item-${index}`}>{instruction}</li>
    ));

    // Display Edit button if recipe username is same as logged in user.
    let editButton;
    if (this.props.token) {
      // Extract username from token.
      const usernameToken = JSON.parse(atob(this.props.token.split('.')[1])).username;

      // Return Edit Button.
      editButton = ((username === usernameToken)
        ? <EditButton recipeID={this.props.params.recipe_id} />
        : null);
    }

    return (
      <div className="box shadow widget-viewrecipe">
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />

        {editButton}

        <div className="container-field container-recipe-title text-center">
          <h1>{title}</h1>
        </div>

        <div className="container-field container-recipe-username text-center">
          by: {username}
        </div>

        <div className="container-field container-recipe-tagline text-center">
          {tagline}
        </div>

        <div className="container-ingredients-image">
          <div className="container-field container-recipe-ingredients">
            <h3 className="text-center">Ingredients</h3>
            <ul>
              {ingredientsItems}
            </ul>
          </div>

          <div className="container-field container-recipe-image text-center">
            <img src={image} className="recipe-image" role="presentation" />
          </div>
        </div>

        <div className="container-field container-recipe-instructions">
          <h3 className="text-center">Preparation Instructions</h3>
          <ol>
            {instructionsItems}
          </ol>
        </div>

      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(withRouter(ViewRecipeWidget));

// Prop validation.
ViewRecipeWidget.propTypes = {
  params: React.PropTypes.shape({
    recipe_id: React.PropTypes.string,
  }),
  token: React.PropTypes.string,
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

// Edit Button.
const EditButton = ({ recipeID }) => (
  <Link to={`/edit_recipe/${recipeID}`} className="link-submit width-100">Edit Recipe</Link>
);
EditButton.propTypes = {
  recipeID: React.PropTypes.string.isRequired,
};
