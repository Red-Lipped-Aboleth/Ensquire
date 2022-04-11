import React, { useState } from 'react';
import * as actions from '../actions/actions';

const SavingThrow = (props) => {
  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('name');
    const propertyObject = {};
    propertyObject[propertyName] = event.target.checked;
    props.dispatch(actions.updateSavingThrows(propertyObject));
  };

  function calculateModifierWithProf(score) {
    const base = Math.floor((score - 10) / 2);
    const profBonus = props.passStat ? props.proficiency : 0;
    return base + Number(profBonus);
  }

  return (
    <div className="savingThrow">
      <input
        type="checkbox"
        checked={props.passStat}
        onChange={handleChange}
        name={props.statNames}
      />
      <span className="statNameSecondary">{props.statNames.toUpperCase()}</span>
      <span className="statBonusSecondary">
      {calculateModifierWithProf(props.stat) >= 0 ? '+' : ''}{calculateModifierWithProf(props.stat)}
      </span>
    </div>
  );
};

export default SavingThrow;
