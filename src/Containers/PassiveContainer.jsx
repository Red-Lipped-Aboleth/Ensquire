import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import Passive from '../Components/Passive';
import * as actions from '../actions/actions'

const PassiveContainer = (props) => {

    const abilityScores = useSelector(state => state.characterSheet.abilityScores);
    const getProf = useSelector(state => state.characterSheet.profBonus);

    const insight  = useSelector(state => state.characterSheet.skills.insight);
    const investigation  = useSelector(state => state.characterSheet.skills.investigation); 
    const perception  = useSelector(state => state.characterSheet.skills.perception); 

    const skillArr = [ 
        {name: 'insight', value: insight, statToUse: 'wis', fullName: 'Insight'}, 
        {name: 'investigation', value: investigation, statToUse: 'int', fullName: 'Investigation'}, 
        {name: 'perception', value: perception, statToUse: 'wis', fullName: 'Perception'},
    ];
 
    const passiveComponentArr = skillArr.map((el, i) => {
        return(
            <Passive
                key={el.name} 
                name={el.name}
                value={el.value}
                statToUse={el.statToUse}
                fullName={el.fullName}
                proficiency={getProf}
                abilityScores={abilityScores}
            />
        )
    });
    
    return (
        <section className="passiveComponents">
            {passiveComponentArr}
        </section>
    )
};




export default connect(null)(PassiveContainer);