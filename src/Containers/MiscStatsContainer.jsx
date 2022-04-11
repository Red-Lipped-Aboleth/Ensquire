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
  const sendAllStats = useSelector((state) => state.characterSheet);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const propertyName = event.target.getAttribute('id');
    const propertyObject = {};
    propertyObject[propertyName] = event.target.value;
    dispatch(actions.updateMiscStats(propertyObject));
  };

<<<<<<< HEAD
  const handleClick = () => {
    fetch('/charsheet', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : sessionStorage.token,
        'username' : sessionStorage.username,
      },
      body: JSON.stringify(sendAllStats),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data:', data);
      })
      .catch((err) => {
        console.log(console.log(`Error submitting character sheet details! Error: ${err}`));
      });
  };
=======
  // const handleClick = () => {
  //   fetch('/charsheet', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(sendAllStats),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('data:', data);
  //     })
  //     .catch((err) => {
  //       console.log(console.log(`Error submitting character sheet details! Error: ${err}`));
  //     });
  // };
>>>>>>> dev

  return (
    <section className="miscStats" id="miscStats">
      <label htmlFor="profBonus">Proficiency: </label>
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

      <label htmlFor="speed">Speed: </label>
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

      <span>Initiative: </span>
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

      <span>Armor: </span>
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
      {/* <button onClick={handleClick}>Submit</button> */}
    </section>
  );
};

export default MiscStatsContainer;
