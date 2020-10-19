import React, { useState } from 'react';
import './select-css.css';

/**
 * Display a dropdown with a currency.
 * @param {*} props
 */
function Dropdown(props) {
  const [state, setState] = useState(props.defaultState);

  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        className="select-css"
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}>
        {props.options.map((item) => (
          <option
            key={item.symbol}
            value={item.symbol}
            disabled={item.isDisabled}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
