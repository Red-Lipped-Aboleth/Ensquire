import React, { useState } from 'react';
import * as actions from '../actions/actions';

const Passive = (props) => {
  function calculateModifierWithProf(score) {
    const base = Math.floor((score - 10) / 2);
    const profBonus = props.value ? props.proficiency : 0;
    return 10 + base + Number(profBonus);
  }

  return (
    <div className="passiveComponent">
      <span>
        {calculateModifierWithProf(props.abilityScores[props.statToUse])}
      </span>
      <span>
        PASSIVE {props.statToUse.toUpperCase()} ({props.fullName})
      </span>
    </div>
  );
};

export default Passive;
