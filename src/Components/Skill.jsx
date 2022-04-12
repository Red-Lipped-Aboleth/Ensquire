import React, { useState } from 'react';
import * as actions from '../actions/actions';

//skills are currently not saving to the store

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
    <>
      <input
        type="checkbox"
        className="checkbox"
        checked={props.value}
        onChange={handleChange}
        name={props.name}
      />
      <span className="statNameSecondary">{props.statToUse.toUpperCase()}</span>
      <span>{props.fullName}</span>
      <span>
        {calculateModifierWithProf(props.abilityScores[props.statToUse]) >= 0 ? '+' : ''}
        {calculateModifierWithProf(props.abilityScores[props.statToUse])}
      </span>
    </>
  );
};

export default Skill;
