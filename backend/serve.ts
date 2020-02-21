const path = require('path');
const envPath = path.join('.', `.env.${process.env.SIMPLETRACK_ENV}`);
require('dotenv').config({ path: envPath });
const cors = require('cors');
import { corsOptions } from './config';
import express, { Application } from 'express';
const bodyParser = require('body-parser');
import { mountRoutes } from './routes';
import { pool } from './db';

// Create a new express application instance
const app: Application = express();

// set up middleware
// todo some kind of token management/authentication
// look into passport-js https://github.com/jaredhanson/passport
// google-oauth for login
app.use(bodyParser.json());

// CORS setup: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors(corsOptions));

// set up routes
mountRoutes(app);

// handle exits cleanly. Clean up resources, etc
const myexit = (type: string) => {
  console.info(`Received '${type}' signal/event. Exiting...`);
  pool.end();
  process.exit();
};

process.on('SIGINT', function () { myexit('SIGINT'); });
process.on('SIGTERM', function () { myexit('SIGTERM'); });
process.on('SIGHUP', function () { myexit('SIGHUP'); });

// catch any uncaught exceptions here and prevent exiting
process.on('uncaughtException', function (err) {
  var util = require('util');
  console.error("Uncaught exception: \n" + util.inspect(err.stack));
});

// kick it
app.listen(process.env.SIMPLETRACK_API_PORT, () => {
  console.log('App listening on port 3000!');
});

