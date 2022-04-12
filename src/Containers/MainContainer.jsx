import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actions from '../actions/actions';

import MiscStatsContainer from './MiscStatsContainer';
import BasicInfoContainer from './BasicInfoContainer';
import NotesContainer from './NotesContainer';
import PassiveContainer from './PassiveContainer';
import SavingThrowContainer from './SavingThrowContainer';
import SkillContainer from './SkillContainer';
import StatBlockContainer from './StatBlockContainer';

const MainContainer = (props) => {
 
  const dispatch = useDispatch();

  const sendAllStats = useSelector((state) => state.characterSheet); 

  useEffect(() => {
    fetch('/charsheet')
      .then((res) => res.json())
      .then((data) => {
      dispatch(actions.populateSheet(data))
      console.log('data:', data)
      })
      .catch((err) => {
        console.log(`Error retrieving character sheet details! Error: ${err}`);
      });
   }, []);


  const handleClick = () => {
    fetch('/charsheet', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
  
  return (
    <main className="container">
      <h1 id="header">Dungeons & Dragons Character Sheet</h1>
      <BasicInfoContainer />
      <MiscStatsContainer />
      <StatBlockContainer />
      <section className="bottom-container">
        <SavingThrowContainer />
        <PassiveContainer />
        <NotesContainer />
        <button onClick={handleClick}>SAVE CHARACTER</button>
        <SkillContainer />
      </section>
    </main>
  );
};

export default MainContainer;
