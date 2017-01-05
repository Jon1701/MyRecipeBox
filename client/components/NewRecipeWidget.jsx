// Dependencies.
import React from 'react';                  // React.
import request from 'common/request';       // HTTP GET/POST functionality.
import { connect } from 'react-redux';      // Connects component to Redux store.
import ContentEditable from 'react-contentEditable';  // Content-editable divs.

// React Components.
import AlertBox from 'components/AlertBox'; // Alert Box.

// Component definition.
class NewRecipeWidget extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      alert: null,  // Alert Box notification.
      ingredients: [],
      instructions: [],
    };

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this); // Form Submit.
    this.handleFormReset = this.handleFormReset.bind(this); // Form Reset.
    this.setAlert = this.setAlert.bind(this); // Set current alert.
    this.clearAlert = this.clearAlert.bind(this); // Clear the current alert.
    this.updateIngredient = this.updateIngredient.bind(this);
    this.updateInstruction = this.updateInstruction.bind(this);
    this.addRemoveFields = this.addRemoveFields.bind(this); // Adds/Remove ingredients/instructions.
  }

  // Method to set the current alert.
  setAlert(type, message) {
    this.setState({ alert: { type, message } });
  }

  // Method to clear the current alert.
  clearAlert() {
    this.setState({ alert: null });
  }

  // Method to handle form submit.
  handleFormSubmit(e) {
    // Prevent default form submit.
    e.preventDefault();

    // Clear any existing alerts.
    this.clearAlert();
  }

  // Method to handle form reset.
  handleFormReset() {
    // Clear fields.
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

    // Mutate copy of array.
    switch (action) {
      // Different actions each case.
      case 'ADD':
        // Add new blank string to the array.
        arrayItems.push('');
        break;

      case 'REMOVE':
        // Remove last element.
        arrayItems = arrayItems.slice(0, arrayItems.length - 1);
        break;

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
        className="input-textarea"
        key={`recipe-instruction-${idx}`}
        type="text"
        value={this.state.instructions[idx]}
        onChange={(e) => { this.updateInstruction(e, idx); }}
        rows="2"
      />
    ));

    return (
      <div className="box shadow">
        <AlertBox alert={this.state.alert} handleClose={this.clearAlert} />
        <form type="POST" onSubmit={this.handleFormSubmit}>
          <div className="input-group">
            <input
              className="input"
              type="text"
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="Recipe Title"
            />
          </div>

          <div className="input-group">
            <input
              className="input"
              type="text"
              id="recipe-tagline"
              onChange={e => this.setState({ tagline: e.target.value })}
              placeholder="Tagline"
            />
          </div>

          <div className="input-group ingredients-group">
            <div className="text-center">Ingredients:</div>
            <PlusMinus handleClick={this.addRemoveFields} stateKey="ingredients" />
            <div className="ingredients-list">
              {renderIngredients}
            </div>
          </div>

          <div className="input-group instructions-group">
            <div className="text-center">Preparation Instructions:</div>
            <PlusMinus handleClick={this.addRemoveFields} stateKey="instructions" />
            <div className="ingredients-list">
              {renderInstructions}
            </div>
          </div>

          <button className="width-100 btn btn-submit" type="submit" value="submit">Save Recipe</button>
        </form>
      </div>
    );
  }
}

// Maps state to props.
const mapStateToProps = state => ({ token: state.token });

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(NewRecipeWidget);

/*
 *
 *
 *  Presentational Components.
 *
 *
 */

// Component containing buttons to add/remove fields.
const PlusMinus = ({ handleClick, stateKey }) => (
  <div className="btn-group-plusminus">
    <button className="btn btn-add-remove" type="button" onClick={(e) => { handleClick(e, 'ADD', stateKey); }}>Add</button>
    <button className="btn btn-add-remove" type="button" onClick={(e) => { handleClick(e, 'REMOVE', stateKey); }}>Remove</button>
  </div>
);

// Prop validation.
PlusMinus.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  stateKey: React.PropTypes.oneOf(['instructions', 'ingredients']).isRequired,
};
