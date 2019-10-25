const path = require('path');
const envPath = path.join('.', `.env.${process.env.SIMPLETRACK_ENV}`);
require('dotenv').config({ path: envPath });
import express, { Application } from 'express';
const bodyParser = require('body-parser');
import { mountRoutes } from './routes';

// Create a new express application instance
const app: Application = express();

// set up middleware
// todo some kind of token management
app.use(bodyParser.json());
// todo CORS setup
// todo a middleware to convert camel to snake case and back

// set up routes
mountRoutes(app);

// kick it
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

// todo: clean exit; db pool.end(), etc.
