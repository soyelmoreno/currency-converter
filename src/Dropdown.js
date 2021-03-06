import React from 'react';
import './select-css.css';

/**
 * Display a dropdown with a currency.
 */
function Dropdown(props) {
  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        className="select-css"
        value={props.value}
        onChange={(e) => props.onChange(e, props.id)}
        onBlur={(e) => props.onChange(e, props.id)}>
        {props.options.map((item) => (
          <option
            key={item.symbol}
            value={item.symbol}
            disabled={item.symbol === props.disabledValue}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
