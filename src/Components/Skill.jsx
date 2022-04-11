import React, { useState } from 'react';
import * as actions from '../actions/actions';

const Skill = (props) => {
  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('name');
    const propertyObject = {};
    propertyObject[propertyName] = event.target.checked;
    props.dispatch(actions.updateSkills(propertyObject));
  };

  function calculateModifierWithProf(score) {
    const base = Math.floor((score - 10) / 2);
    const profBonus = props.value ? props.proficiency : 0;
    return base + Number(profBonus);
  }

  return (
    <div className="skillComponent">
      <input
        type="checkbox"
        className="checkbox"
        checked={props.value}
        onChange={handleChange}
        name={props.name}
      />
      <span>{props.statToUse.toUpperCase()}</span>
      <span>{props.fullName}</span>
      <span>
        {calculateModifierWithProf(props.abilityScores[props.statToUse])}
      </span>
    </div>
  );
};

export default Skill;
