import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import StatBlock from '../Components/StatBlock';

const StatBlockContainer = (props) => {
  const getStr = useSelector((state) => state.characterSheet.abilityScores.str);
  const getDex = useSelector((state) => state.characterSheet.abilityScores.dex);
  const getCon = useSelector((state) => state.characterSheet.abilityScores.con);
  const getInt = useSelector((state) => state.characterSheet.abilityScores.int);
  const getWis = useSelector((state) => state.characterSheet.abilityScores.wis);
  const getCha = useSelector((state) => state.characterSheet.abilityScores.cha);

  const dispatch = useDispatch();

  const statArr = [getStr, getDex, getCon, getInt, getWis, getCha];
  const keyNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const fullStatNames = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma',
  ];
  
  const statBlockArray = statArr.map((el, i) => {
    return (
      <StatBlock
        key={keyNames[i]}
        statNames={keyNames[i]}
        fullStatNames={fullStatNames[i]}
        stat={el}
        dispatch={dispatch}
      />
    );
  });

  return <section className="statBlock">{statBlockArray}</section>;
};

export default connect(null)(StatBlockContainer);
