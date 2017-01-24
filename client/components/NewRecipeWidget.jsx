// Dependencies.
import React from 'react';                  // React.
import request from 'common/request';       // HTTP GET/POST functionality.
import { connect } from 'react-redux';      // Connects component to Redux store.
import { withRouter } from 'react-router';  // Allows component to be aware of React Router.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.
import AddRemoveButtons from 'components/AddRemoveButtons';
import ImageUploader from 'components/ImageUploader';
import CustomComponent from 'components/CustomComponent'; // React component with AlertBox methods.

// Component definition.
class NewRecipeWidget extends CustomComponent {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      title: '',    // Recipe title.
      tagline: '',  // Recipe tagline.
      image: null,    // Recipe image.
      ingredients: ['', '', '', '', ''],  // Array of recipe ingredients.
      instructions: ['', '', ''], // Array of recipe preparation instructions.
      mode: this.props.mode,  // Mode of this component: NewRecipe or EditRecipe.
    };

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this); // Form Submit.
    this.handleFormReset = this.handleFormReset.bind(this); // Form Reset.
    this.updateIngredient = this.updateIngredient.bind(this);
    this.updateInstruction = this.updateInstruction.bind(this);
    this.addRemoveFields = this.addRemoveFields.bind(this); // Adds/Remove ingredients/instructions.
  }

  // Component Lifecycle Method.
  componentDidMount() {
    // If the component mode is EditRecipe, get recipe data and store it in state.
    if (this.state.mode === 'EditRecipe') {
      // Get recipe ID from route parameter.
      const recipeID = this.props.params.recipe_id;

      // Get recipe data from the API server.
      request
        .get(`/api/get_recipes?recipe_id=${recipeID}`)
        .then((res) => {
          // Success response handling.
          switch (res.data.code) {

            // Recipe search complete.
            case 'RECIPE_SEARCH_COMPLETE': {
              // If no recipes were found, throw an error, .catch() will handle it.
              if (res.data.payload.recipes.length === 0) {
                throw new Error();
              } else {
                // Deconstruct recipe fields.
                const { title, tagline, ingredients, instructions, username, image }
                  = res.data.payload.recipes[0];

                // Store recipe in state.
                this.setState({ title, tagline, ingredients, instructions, username, image });
              }
              break;
            }

            // Default case: do nothing.
            default:
              break;

          }
        })
        .catch(() => {
          // If any error occurs, display error message.
          this.setAlert('FAILURE', 'No recipe found.');
        });
    }
  }

  // Method to handle form submit.
  handleFormSubmit(e) {
    // Prevent default form submit.
    e.preventDefault();

    // Clear any existing alerts.
    this.clearAlert();

    // Gather form field values.
    const { title, tagline, ingredients, instructions, image } = this.state;

    // Request body.
    const body = { title, tagline, ingredients, instructions, image };

    // Get the recipe id from router props.
    const recipeID = this.props.params.recipe_id;

    // If the recipe ID exists, add it to the request body.
    body['recipe_id'] = recipeID;

    // Make a POST request to the API server, send recipe data, and token.
    request
      .post('/api/auth/create_recipe', body, this.props.token)
      .then((res) => {
        // Get recipe ID.
        const recipeID = res.data.payload.recipe['_id'];

        // Different behaviour based on success message.
        switch (res.data.code) {

          // Recipe successfully created.
          case 'CREATE_RECIPE_SUCCESS': {
            // Display success message.
            this.setAlert('SUCCESS', 'Recipe successfully created. Redirecting now.');

            // Redirect function.
            const redirect = () => {
              this.props.router.replace(`/view_recipe/${recipeID}`);
            };

            // Redirect to the login page.
            setTimeout(redirect.bind(this), 2000);
            break;
          }

          // Recipe successfully updated.
          case 'UPDATE_RECIPE_SUCCESS':
            // Display success message.
            this.setAlert('SUCCESS', 'Recipe successfully updated.');
            break;

          // Default behaviour: do nothing.
          default:
            break;
        }
      })
      .catch((err) => {
        // Display alert box with corresponding message.
        switch (err.response.data.code) {

          // Database error.
          case 'DB_ERROR':
            this.setAlert('FAILURE', 'Database error occurred.');
            break;

          // Missing title.
          case 'MISSING_TITLE':
            this.setAlert('FAILURE', 'Your recipe needs a title.');
            break;

          // Missing tagline.
          case 'MISSING_TAGLINE':
            this.setAlert('FAILURE', 'You should really provide a short summary of your recipe.');
            break;

          // Missing ingredients.
          case 'MISSING_INGREDIENTS':
            this.setAlert('FAILURE', 'No ingredients? What are you making? Air?');
            break;

          // Missing instructions.
          case 'MISSING_INSTRUCTIONS':
            this.setAlert('FAILURE', 'No preparation instructions? Did you buy this dish from a supermarket?');
            break;

          // Not enough ingredients.
          case 'MULTIPLE_INGREDIENTS_NEEDED':
            this.setAlert('FAILURE', 'You must provide at least 2 ingredients.');
            break;

          // Not enough preparation steps.
          case 'MULTIPLE_PREPARATION_STEPS_NEEDED':
            this.setAlert('FAILURE', 'At least 2 preparation instructions are needed.');
            break;

          // Invalid token.
          case 'INVALID_TOKEN':
            this.setAlert('FAILURE', 'Your session is invalid. Please log in again.');
            break;

          // Default action: do nothing.
          default:
            break;
        }
      });
  }

  // Method to handle form reset.
  handleFormReset() {
    // Clear fields.
    this.setState({
      title: '',      // Recipe title.
      tagline: '',    // Recipe tagline.
      ingredients: [],  // Array of recipe ingredients.
      instructions: [], // Array of recipe preparation instructions.
    });
  }

  // Method to update the ingredient at a given index in the array.
  updateIngredient(e, idx) {
    // Get a copy of ingredients array.
    const ingredients = this.state.ingredients.slice();

    // Update the ingredient at the specified index with the new value.
    ingredients[idx] = e.target.value;

    // Update list of ingredients with the updated copy.
    this.setState({ ingredients });
  }

  // Method to update the ingredient at a given index in the array.
  updateInstruction(e, idx) {
    // Get a copy of ingredients array.
    const instructions = this.state.instructions.slice();

    // Update the ingredient at the specified index with the new value.
    instructions[idx] = e.target.value;

    // Update list of ingredients with the updated copy.
    this.setState({ instructions });
  }

  // Method to add/remove ingredients/instructions input boxes.
  addRemoveFields(e, action, stateKey) {
    // Deconstruct ingredients and instructions array.
    const { ingredients, instructions } = this.state;

    /*
     * stateKey is either 'ingredients' or 'instructions'
     *
     * Select the correct array.
     */
    let arrayItems = stateKey === 'ingredients' ? ingredients : instructions;

    // Create a copy of that array.
    arrayItems = arrayItems.slice();

    // Add or remove elements in array copy.
    switch (action) {
      // Add new blank string to the array.
      case 'ADD':
        // Display a warning alert if the maximum number of ingredients is reached..
        if ((stateKey === 'ingredients') && (ingredients.length === 50)) {
          this.setAlert('WARNING', 'Maximum of 50 ingredients allowed.');
          return;
        }

        // Display a warning alert if the maximum number of instructions is reached.
        if ((stateKey === 'instructions') && (instructions.length === 50)) {
          this.setAlert('WARNING', 'Maximum of 50 preparation instructions are allowed.');
          return;
        }

        // Add a blank element to the array. Creates a new input/textarea.
        arrayItems.push('');
        break;

      // Remove last element from array.
      case 'REMOVE': {
        // Display a warning alert if only 2 ingredients are left.
        if ((stateKey === 'ingredients') && (ingredients.length === 2)) {
          this.setAlert('WARNING', 'At least 2 ingredients are needed.');
          return;
        }

        // Display a warning alert if only 2 instructions are left.
        if ((stateKey === 'instructions') && (instructions.length === 2)) {
          this.setAlert('WARNING', 'At least 2 preparation instructions are needed.');
          return;
        }

        // Remove the last element in the array.
        arrayItems = arrayItems.slice(0, arrayItems.length - 1);
        break;
      }

      // Default case: do nothing.
      default:
        break;
    }

    // If we are changing ingredients, replace state copy with the new one.
    if (stateKey === 'ingredients') {
      return this.setState({ ingredients: arrayItems });
    }

    // If we are changing instructions, replace state copy with the new one.
    return this.setState({ instructions: arrayItems });
  }

  // Component render.
  render() {
    /*
     *  If component mode is EditRecipe, and no recipe was found, return
     *  message stating no recipe found.
     */
    if (this.props.mode === 'EditRecipe' && this.state.title === '') {
      return (
        <div className="box shadow text-center">
          No recipe found.
        </div>
      );
    }

    /*
     *  If:
     *  - component mode is EditRecipe
     *  - user logged in
     *  - logged in user and recipe user are different
     *  prevent editing.
     */
    if (this.props.mode === 'EditRecipe' && this.props.token) {
      // Get username and recipe username.
      const recipeUsername = this.state.username;
      const tokenUsername = JSON.parse(atob(this.props.token.split('.')[1])).username;

      // If usernames are different, return message stating that useris not authorized to edit.
      if (recipeUsername !== tokenUsername) {
        return (
          <div className="box shadow text-center">
            Not authorized to edit this recipe.
          </div>
        );
      }
    }

    // Dynamically render <input/> for each ingredient.
    const renderIngredients = this.state.ingredients.map((val, idx) => (
      <input
        className="input"
        key={`recipe-ingredient-${idx}`}
        type="text"
        value={this.state.ingredients[idx]}
        onChange={(e) => { this.updateIngredient(e, idx); }}
      />
    ));

    // Dynamically render <input/> for each instruction.
    const renderInstructions = this.state.instructions.map((val, idx) => (
      <textarea
        className="textarea"
        key={`recipe-instruction-${idx}`}
        type="text"
        value={this.state.instructions[idx]}
        onChange={(e) => { this.updateInstruction(e, idx); }}
        rows="2"
      />
    ));

    return (
      <div className="box shadow text-center widget-newrecipe">
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <form type="POST" onSubmit={this.handleFormSubmit}>

          <RecipeTitle
            handleChange={title => this.setState({ title })}
            title={this.state.title}
          />

          <RecipeTagline
            handleChange={tagline => this.setState({ tagline })}
            tagline={this.state.tagline}
          />

          <div className="container-ingredients-uploader">
            <RecipeIngredients
              handleClick={this.addRemoveFields}
              renderIngredients={renderIngredients}
            />

            <ImageUploader
              token={this.props.token}
              storeImage={imageURL => this.setState({ image: imageURL })}
              image={this.state.image}
            />
          </div>

          <RecipeInstructions
            handleClick={this.addRemoveFields}
            renderInstructions={renderInstructions}
          />

          <button className="btn btn-submit width-100" type="submit" value="submit">
            Save Recipe
          </button>

        </form>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(withRouter(NewRecipeWidget));

// Prop validation.
NewRecipeWidget.propTypes = {
  token: React.PropTypes.string.isRequired,
  mode: React.PropTypes.oneOf(['NewRecipe', 'EditRecipe']),
};

/*
 *
 *  Presentational components.
 *
 */

// Recipe Title.
const RecipeTitle = ({ title, handleChange }) => (
  <div className="container-recipe-title container-field">
    <label className="label" htmlFor="recipe-title">Recipe Title:</label>
    <input
      className="input"
      id="recipe-title"
      type="text"
      onChange={e => handleChange(e.target.value)}
      value={title}
    />
  </div>
);
RecipeTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};

// Recipe Tagline.
const RecipeTagline = ({ tagline, handleChange }) => (
  <div className="container-recipe-tagline container-field">
    <label className="label" htmlFor="recipe-tagline">Recipe Tagline:</label>
    <input
      className="input"
      type="text"
      id="recipe-tagline"
      onChange={e => handleChange(e.target.value)}
      value={tagline}
    />
  </div>
);
RecipeTagline.propTypes = {
  tagline: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};

// Recipe Ingredients.
const RecipeIngredients = ({ handleClick, renderIngredients }) => (
  <div className="container-recipe-ingredients container-field">
    <label className="label" htmlFor="recipe-ingredients">Ingredients:</label>
    <AddRemoveButtons
      handleClick={handleClick}
      stateKey="ingredients"
    />
    <div>{renderIngredients}</div>
  </div>
);
RecipeIngredients.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  renderIngredients: React.PropTypes.node.isRequired,
};

// Recipe Instructions.
const RecipeInstructions = ({ handleClick, renderInstructions }) => (
  <div className="container-recipe-instructions container-field">
    <label className="label" htmlFor="recipe-instructions">Preparation Instructions:</label>
    <AddRemoveButtons
      handleClick={handleClick}
      stateKey="instructions"
    />
    <div>{renderInstructions}</div>
  </div>
);
RecipeInstructions.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  renderInstructions: React.PropTypes.node.isRequired,
};
