import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import Skill from '../Components/Skill'

const SkillContainer = (props) => {

    const abilityScores = useSelector(state => state.characterSheet.abilityScores);
    const getProf = useSelector(state => state.characterSheet.profBonus);

    const acrobatics = useSelector(state => state.characterSheet.skills.acrobatics);
    const animalHandling = useSelector(state => state.characterSheet.skills.animalHandling);        
    const arcana  = useSelector(state => state.characterSheet.skills.arcana);
    const athletics  = useSelector(state => state.characterSheet.skills.athletics);
    const deception  = useSelector(state => state.characterSheet.skills.deception);
    const history  = useSelector(state => state.characterSheet.skills.history);
    const insight  = useSelector(state => state.characterSheet.skills.insight);
    const intimidation  = useSelector(state => state.characterSheet.skills.intimidation);
    const investigation  = useSelector(state => state.characterSheet.skills.investigation); 
    const medicine  = useSelector(state => state.characterSheet.skills.medicine); 
    const nature  = useSelector(state => state.characterSheet.skills.nature); 
    const perception  = useSelector(state => state.characterSheet.skills.perception); 
    const performance  = useSelector(state => state.characterSheet.skills.performance); 
    const persuasion  = useSelector(state => state.characterSheet.skills.persuasion); 
    const religion  = useSelector(state => state.characterSheet.skills.religion); 
    const sleightOfHand  = useSelector(state => state.characterSheet.skills.slightOfHand); 
    const stealth  = useSelector(state => state.characterSheet.skills.stealth);  
    const survival = useSelector(state => state.characterSheet.skills.survival);

    const skillArr = [
        {name: 'acrobatics', value: acrobatics, statToUse: 'dex', fullName: 'Acrobatics'},
        {name: 'animalHandling', value: animalHandling, statToUse: 'wis', fullName: 'Animal Handling'},
        {name: 'arcana', value: arcana, statToUse: 'int', fullName: 'Arcana'}, 
        {name: 'athletics', value: athletics, statToUse: 'str', fullName: 'Athletics'}, 
        {name: 'deception', value: deception, statToUse: 'cha', fullName: 'Deception'}, 
        {name: 'history', value: history, statToUse: 'int', fullName: 'History'}, 
        {name: 'insight', value: insight, statToUse: 'wis', fullName: 'Insight'}, 
        {name: 'intimidation', value: intimidation, statToUse: 'cha', fullName: 'Intimidation'}, 
        {name: 'investigation', value: investigation, statToUse: 'int', fullName: 'Investigation'}, 
        {name: 'medicine', value: medicine, statToUse: 'wis', fullName: 'Medicine'},
        {name: 'nature', value: nature, statToUse: 'int', fullName: 'Nature'},
        {name: 'perception', value: perception, statToUse: 'wis', fullName: 'Perception'},
        {name: 'performance', value: performance, statToUse: 'cha', fullName: 'Performance'},
        {name: 'persuasion', value: persuasion, statToUse: 'cha', fullName: 'Persuasion'},
        {name: 'religion', value: religion, statToUse: 'int', fullName: 'Religion'},
        {name: 'sleightOfHand', value: sleightOfHand, statToUse: 'dex', fullName: 'Sleight of Hand'},
        {name: 'stealth', value: stealth, statToUse: 'dex', fullName: 'Stealth'},
        {name: 'survival', value: survival, statToUse: 'wis', fullName: 'Survival'},
    ]

    const dispatch = useDispatch(); 
 
    const skillComponentArr = skillArr.map((el, i) => {
        return (
            <Skill
                key={el.name} 
                name={el.name}
                value={el.value}
                statToUse={el.statToUse}
                fullName={el.fullName}
                dispatch={dispatch}
                proficiency={getProf}
                abilityScores={abilityScores}
            />
        );
    });
    
    return (
        <section className="skillComponents">
            <span className="statName2">PROF</span> 
            <span className="statName2">MOD</span> 
            <span className="statName2">SKILL</span> 
            <span className="statName2">BONUS</span> 
            {skillComponentArr}
        </section>
    )
};

export default connect(null)(SkillContainer);