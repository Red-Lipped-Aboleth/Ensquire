const jwt = require('jsonwebtoken');
const path = require('path');
const ENV = require('dotenv').config({ path: path.resolve(__dirname, '../.env')});
const db = require('../model/database_model');

const sessionController = {};

sessionController.checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log(req.headers);
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, ENV.parsed.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token invalid'
        })
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'No auth token provided'
    })
  }
};

sessionController.createToken = (req, res, next) => {
  const { username, password } = req.body;
  const query = 'SELECT password FROM user_table WHERE username = $1';

  if (username && password) {
    db.query(query, [username])
    .then((result) => {
      if (result.rows[0].password === password) {
        let token = jwt.sign({username}, ENV.parsed.SECRET_KEY, { expiresIn : '6h' });
        res.json({
          success: true,
          message: 'Authentication successful',
          token: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    })
    .catch((err) => {
      return next({
        log: `Error: ${err}`,
        message: 'Error finding user - see server logs for more details'
      });
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request.'
    });
  }
}

module.exports = sessionController;