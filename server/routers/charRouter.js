const express = require('express');
const router = express.Router();
const charsheetController = require('../controllers/charsheetController');

router.get('/', charsheetController.getCharSheet, (req, res) => {
  res.status(200).json(res.locals.charSheet);
});

router.put('/', charsheetController.updateCharSheet, (req, res) => {
  res.status(200).json(res.locals.charSheet);
});

module.exports = router;