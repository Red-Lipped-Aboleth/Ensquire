const db = require('../model/database_model');

const charsheetController = {};

// Character template
// {
//   characterName: String,
//   abilityScores: {
//     str: Number,
//     dex: Number,
//     con: Number,
//     int: Number,
//     wis: Number,
//     cha: Number
//   },
//   race: String,
//   class: String,
//   level: Number,
//   armorClass: Number,
//   profBonus: Number,
//   speed: Number,
//   currHP: Number,
//   maxHP: Number,
//   savingThrow: {
//     str: Boolean,
//     dex: Boolean,
//     con: Boolean,
//     int: Boolean,
//     wis: Boolean,
//     cha: Boolean
//   },
//   skills: {
//       acrobatics: Boolean,
//       animalHandling: Boolean,
//       arcana: Boolean,
//       athletics: Boolean,
//       deception: Boolean,
//       history: Boolean,
//       insight: Boolean,
//       intimidation: Boolean,
//       investigation: Boolean,
//       medicine: Boolean,
//       nature: Boolean,
//       perception: Boolean,
//       performance: Boolean,
//       persuasion: Boolean,
//       religion: Boolean,
//       sleightOfHand: Boolean,
//       stealth: Boolean,
//       survival: Boolean
//   },
//   additionalNotes: varchar('1billion'),
// }

charsheetController.getCharSheet = (req, res, next) => {
  // grabs character sheet
}

charsheetController.updateCharSheet = (req, res, next) => {
  // updates character sheet
}