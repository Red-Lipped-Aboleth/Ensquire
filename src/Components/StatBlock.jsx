import React from 'react';
import * as actions from '../actions/actions';

const StatBlock = (props) => {
  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('id');
    const propertyObject = {}
    propertyObject[propertyName] = event.target.value
    props.dispatch(
      actions.updateStatsBlock(propertyObject)
    );
  };

  function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
  }

  return (
    <div className="stat">
      <span className="statName">{props.fullStatNames.toUpperCase()}</span>
      <span className="statMod">{calculateModifier(props.stat)}</span>
      <input
        type="number"
        className="statNum"
        name={props.statNames}
        id={props.statNames}
        min="0"
        max="30"
        step="1"
        value={props.stat}
        onChange={handleChange}
      />
    </div>
  );
};

export default StatBlock;
