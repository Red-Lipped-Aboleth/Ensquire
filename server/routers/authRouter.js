const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.checkCredentials, userController.setAuth, (req, res) => {
  res.redirect('/charsheet');
});

router.post('/', userController.createUser, userController.setAuth, (req, res) => {
  res.redirect('/charsheet');
});