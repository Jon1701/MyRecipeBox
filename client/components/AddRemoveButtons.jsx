// Dependencies.
import React from 'react';
import classNames from 'classnames';

// Component containing buttons to add/remove fields.
export default class AddRemoveButtons extends React.Component {
  render() {
    // Deconstruct props.
    const { handleClick, stateKey, readOnly } = this.props;

    // Classnames to control component visibility.
    const myClasses = classNames({
      hidden: readOnly,
      'container-addremovebuttons': true,
    });

    return (
      <div className={myClasses}>
        <button
          className="btn btn-default"
          type="button"
          onClick={(e) => { handleClick(e, 'ADD', stateKey); }}
          readOnly={this.props.readOnly}
        >
          Add
        </button>

        <button
          className="btn btn-default"
          type="button"
          onClick={(e) => { handleClick(e, 'REMOVE', stateKey); }}
          readOnly={this.props.readOnly}
        >
          Remove
        </button>
      </div>
    );
  }
}

// Prop validation.
AddRemoveButtons.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  stateKey: React.PropTypes.oneOf(['instructions', 'ingredients']).isRequired,
  readOnly: React.PropTypes.bool,
};
