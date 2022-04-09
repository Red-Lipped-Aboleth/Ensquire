/**
 * 
 * @description Creates a Redux reducer specific to state changes to the character sheet.
 * 
 */

import * as types from '../constants/actiontypes';

const defaultState = {
  characterName: 'default',
  abilityScores: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10
  },
  race: 'human',
  class: 'fighter',
  level: 1,
  armorClass: 10,
  profBonus: 0,
  speed: 30,
  currHP: 10,
  maxHP: 10,
  savingThrow: {
    str: false,
    dex: false,
    con: false,
    int: false,
    wis: false,
    cha: false
  },
  skills: {
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false
  },
  additionalNotes: ''
}

function characterSheetReducer (state = defaultState, action) {
  switch (action.type) {
    case types.POPULATE_SHEET:
      return updateObject(state, action.payload);
    case types.UPDATE_BASIC_INFO:
      return updateObject(state, action.payload);
    case types.UPDATE_STATS_BLOCK:
      return updateObject(state, {abilityScores: action.payload});
    case types.UPDATE_MISC_STATES:
      return updateObject(state, action.payload)
    case types.UPDATE_SAVING_THROWS:
      return updateObject(state, {savingThrow: action.payload});
    case types.UPDATE_SKILLS:
      return updateObject(state, {skills: action.payload});
    case types.UPDATE_NOTES:
      return updateObject(state, action.payload);
    default: 
      return state
  }
}

// Helper function to return state
function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}


export default characterSheetReducer;

console.log(characterSheetReducer(defaultState, {type: undefined}));