import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
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
  //getReq to backend to populate everything
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('/charRouter');
//       const newRes = await response.json();
//     };
//     fetchData();
//   }, []);

  return (
    <main className="container">
      <h1 id="header">Dungeons & Dragons Character Sheet</h1>
      {/* Containers here... */}
      <BasicInfoContainer/>
      <MiscStatsContainer/>
      <StatBlockContainer/>
      <SavingThrowContainer/>
      <SkillContainer/>
      <PassiveContainer/>
      <NotesContainer/>
    </main>
  );
};

//do we need to export connect(null)?
export default MainContainer;
