import React from 'react';
import './InputField.css';

/**
 * Display an input field so user can type in amounts.
 */
function InputField(props) {
  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="input-wrap">
        <input
          type="text"
          id={props.id}
          className="input-amt"
          placeholder="Enter an amount"
          value={props.amount}
          onChange={props.onChange}
        />
        <span>{props.currency}</span>
      </div>
    </div>
  );
}

export default InputField;
