/**
 * 
 * @description This file contains Redux actions to be sent to dispatch
 * 
 */


// import actionType constants

import * as types from '../consants/actionTypes';

export const populateSheet = retrievedData => ({
  type: types.POPULATE_SHEET,
  payload: retrievedData,
});

export const updateBasicInfo = basicInfo => ({
  type: types.UPDATE_BASIC_INFO,
  payload: basicInfo,
});

export const updateStatsBlock = statsInfo => ({
  type: types.UPDATE_STATS_BLOCK,
  payload: statsInfo,
});

export const updateMiscStats = miscStatsInfo => ({
  type: types.UPDATE_STATS_BLOCK,
  payload: miscStatsInfo,
});

export const updateSavingThrows = savingThrowsInfo => ({
  type: types.UPDATE_SAVING_THROWS,
  payload: savingThrowsInfo,
});

export const updateSkills = skillsInfo => ({
  type: types.UPDATE_SKILLS,
  payload: skillsInfo,
});

export const updateNotes = notes => ({
  type: types.UPDATE_NOTES,
  payload: notes,
});
