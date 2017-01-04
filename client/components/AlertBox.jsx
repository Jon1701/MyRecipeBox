// Dependencies.
import React from 'react';
import classNames from 'classnames';

export default class AlertBox extends React.Component {
  // Component render.
  render() {

    if (!this.props.alert) {
      return (
        <div className="hidden" />
      );
    }

    const myClasses = classNames({
      alertbox: true,
      'cursor-hand': true,
      'alertbox-success': this.props.alert.type === 'SUCCESS',
      'alertbox-warning': this.props.alert.type === 'WARNING',
      'alertbox-failure': this.props.alert.type === 'FAILURE',
      'alertbox-info': this.props.alert.type === 'INFO',
    });

    return (
      <div className={myClasses} onClick={this.props.handleClose}>
        { this.props.alert.message }
      </div>
    );
  }
}

// Prop validation.
AlertBox.propTypes = {
  alert: React.PropTypes.shape({
    type: React.PropTypes.oneOf(['SUCCESS', 'FAILURE', 'WARNING', 'INFO']),
    message: React.PropTypes.string,
    handleClose: React.PropTypes.func,
  }),
};
