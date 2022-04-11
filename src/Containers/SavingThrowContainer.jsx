import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import SavingThrow from '../Components/SavingThrow';
import * as actions from '../actions/actions'

const SavingThrowContainer = (props) => {

    const getStr = useSelector(state => state.characterSheet.abilityScores.str);
    const getDex = useSelector(state => state.characterSheet.abilityScores.dex);
    const getCon = useSelector(state => state.characterSheet.abilityScores.con);
    const getInt = useSelector(state => state.characterSheet.abilityScores.int);
    const getWis = useSelector(state => state.characterSheet.abilityScores.wis);
    const getCha = useSelector(state => state.characterSheet.abilityScores.cha);
    const passStr = useSelector(state => state.characterSheet.savingThrow.str);
    const passDex = useSelector(state => state.characterSheet.savingThrow.dex);
    const passCon = useSelector(state => state.characterSheet.savingThrow.con);
    const passInt = useSelector(state => state.characterSheet.savingThrow.int);
    const passWis = useSelector(state => state.characterSheet.savingThrow.wis);
    const passCha = useSelector(state => state.characterSheet.savingThrow.cha);
    const getProf = useSelector(state => state.characterSheet.profBonus);

    const dispatch = useDispatch(); 

    const statArr = [getStr, getDex, getCon, getInt, getWis, getCha];
    const passStatArr = [passStr, passDex, passCon, passInt, passWis, passCha];    
    const keyNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  
    const statBlockArray = statArr.map((el, i) => {
        return (
            <SavingThrow 
            key={keyNames[i]} 
            statNames={keyNames[i]} 
            stat={el} 
            passStat={passStatArr[i]}
            dispatch={dispatch}
            proficiency={getProf}
            />);
    });
    
    return (
        <section className="savingThrowBlock">
            {statBlockArray}
        </section>
    )
};

export default SavingThrowContainer;