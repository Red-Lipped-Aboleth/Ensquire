import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actions from '../actions/actions';
//import images
//also remember to add images to webpack?

/*
Located at the top of the page 
photo of character  ======================== hitpoints
name of character 
race
level
*/

//LOOK INTO DEFAULT INPUT FIELDS !!!!!!!

const BasicInfoContainer = (props) => {
  //on change, make a change to the redux store
  const getBasicInfo = useSelector((state) => state.characterSheet);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('id');
    const propertyObject = {};
    propertyObject[propertyName] = event.target.value;
    dispatch(actions.updateBasicInfo(propertyObject));
  };

  return (
    <section className="basicInfo" id="basicInfo">
      {/* <img src={charPhoto} /> */}
      <section className="topHeader">
      <label htmlFor="characterName">Name: </label>
        <input
          type="text"
          name="characterName"
          id="characterName"
          value={getBasicInfo.characterName}
          onChange={handleChange}
        />
        <label htmlFor="race">Race: </label>
        <input
          type="text"
          name="race"
          id="race"
          value={getBasicInfo.race}
          onChange={handleChange}
        />

        <label htmlFor="class">Class: </label>
        <input
          type="text"
          name="class"
          id="class"
          value={getBasicInfo.class}
          onChange={handleChange}
        />

        <label htmlFor="level">Level: </label>
        <input
          type="number"
          name="level"
          id="level"
          value={getBasicInfo.level}
          min="1"
          max="20"
          step="1"
          onChange={handleChange}
        />
      </section>

      <section className="bottomHeader">
        <label htmlFor="currHP">Hit Points: </label>
        <input
          type="number"
          name="currHP"
          id="currHP"
          value={getBasicInfo.currHP}
          step="1"
          onChange={handleChange}
        />
        <span className="slash">/</span>
        <input
          type="number"
          name="maxHP"
          id="maxHP"
          value={getBasicInfo.maxHP}
          step="1"
          onChange={handleChange}
        />
      </section>
    </section>
  );
};

export default BasicInfoContainer;
