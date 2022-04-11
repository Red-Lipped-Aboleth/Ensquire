const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 3000;

// Import controllers
const userController = require('./controllers/userController');
const charsheetController = require('./controllers/charsheetController');

// Import routers
const charRouter = require('./routers/charRouter');
const authRouter = require('./routers/authRouter');

// Global JSON and body and cookie parser based off content-type header
app.use(bodyParser.urlencoded({ extended : true }), cookieParser());
app.use(express.json());

// Delivery of assets via express.static
app.use('/assets', express.static(path.join(__dirname, '..dist/assets')));

// Route handlers
app.use('/charsheet', charRouter);
app.use('/auth', authRouter);


// 404 route handler
app.use((req, res) => res.status(404).send('Page not found!'));

// Global event handler
app.use((err, req, res, next) => {
  const defaultErr = {
  log: `Unknown error: ${err}`,
  status: 400,
  message: { err: 'An error occured' }
  }

  // Overwrite default error properties with new error message information, if any
  const errObj = Object.assign(defaultErr, err);

  // Logs error stack to console
  console.log(errObj.log);

  // Completes HTTP cycle by sending back error message
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;