const path = require('path');
require('dotenv').config({ path: path.join('.', `.env.${process.env.SIMPLETRACK_ENV}`) })
// const express = require('express');
import express, { Application } from 'express';
const bodyParser = require('body-parser');
import { mountRoutes } from './routes';

// Create a new express application instance
const app: Application = express();

// set up middleware
// todo some kind of token management
app.use(bodyParser.json());
// todo CORS setup

// set up routes
mountRoutes(app);

// kick it
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
