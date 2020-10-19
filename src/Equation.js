import React from 'react';
import './Equation.css';

/**
 * Displays an equation with the two currencies.
 */
function Equation(props) {
  const classes = 'equation' + (props.isCalc ? ` calculated` : '');
  return (
    <p className={classes}>
      {props.amt1} {props.curr1} = {props.amt2} {props.curr2}
    </p>
  );
}

export default Equation;
