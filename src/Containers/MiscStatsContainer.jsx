import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actions from '../actions/actions';
/* 
Second container form the top 

Proficiency                Walking            Initiative           Armor Class
   num                       ft                  +num                  num
  Bonus                    Speed                                 
*/
const MiscStatsContainer = (props) => {
  //on change, make a change to the redux store
  const getMiscStats = useSelector((state) => state.characterSheet);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('id');
    const propertyObject = {};
    propertyObject[propertyName] = event.target.value;
    dispatch(actions.updateMiscStats(propertyObject));
  };

  return (
    <section className="miscStats" id="miscStats">
      <label htmlFor="profBonus">Proficiency</label>
      <span id="plusSign">+</span>
      <input
        type="number"
        name="profBonus"
        id="profBonus"
        min="0"
        max="20"
        step="1"
        // pattern="/[0-9]/"
        value={getMiscStats.profBonus}
        onChange={handleChange}
      />
      <span>Bonus</span>

      <label htmlFor="speed">WALKING</label>
      <input
        type="number"
        name="speed"
        id="speed"
        min="0"
        max="100"
        step="5"
        value={getMiscStats.speed}
        onChange={handleChange}
      />
      <span>ft.</span>
      <span>Speed</span>

      <span>INITIATIVE</span>
      <span id="plusSign">+</span>
      <input
        type="number"
        name="initiative"
        id="initiative"
        value={getMiscStats.initiative}
        min="0"
        max="99"
        step="1"
        onChange={handleChange}
      />

      <span>ARMOR</span>
      <input
        type="number"
        name="armorClass"
        id="armorClass"
        value={getMiscStats.armorClass}
        step="1"
        min="0"
        max="99"
        onChange={handleChange}
      />
    </section>
  );
};

export default MiscStatsContainer;
