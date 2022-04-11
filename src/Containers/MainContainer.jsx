import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import * as actions from '../actions/actions';
// import ReactDOM from 'react-dom'

// import from child components...
import MiscStatsContainer from './MiscStatsContainer';
import BasicInfoContainer from './BasicInfoContainer';
import NotesContainer from './NotesContainer';
import PassiveContainer from './PassiveContainer';
import SavingThrowContainer from './SavingThrowContainer';
import SkillContainer from './SkillContainer';
import StatBlockContainer from './StatBlockContainer';

const MainContainer = (props) => {
  // const getData = useSelector((state) => state.characterSheet);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/charsheet', {
      headers: {
        'Authorization' : sessionStorage.token,
        'username' : sessionStorage.username,
      }
    })
      .then((res) => res.json())
      .then((data) => {
      dispatch(actions.populateSheet(data))
      console.log('data:', data)
      })
      .catch((err) => {
        console.log(`Error retrieving character sheet details! Error: ${err}`);
      });
   }, []);

  return (
    <main className="container">
      <h1 id="header">Dungeons & Dragons Character Sheet</h1>
      {/* Containers here... */}
      <BasicInfoContainer />
      <MiscStatsContainer />
      <StatBlockContainer />
      <SavingThrowContainer />
      <SkillContainer />
      <PassiveContainer />
      <NotesContainer />
    </main>
  );
};

//do we need to export connect(null)?
export default MainContainer;
