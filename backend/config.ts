const path = require('path');
const envPath = path.join('.', `.env.${process.env.SIMPLETRACK_ENV}`);
require('dotenv').config({ path: envPath });

export const corsOptions = {
  origin: process.env.SIMPLETRACK_ORIGIN ? process.env.SIMPLETRACK_ORIGIN : 'https://simpletrack.net',
  exposedHeaders: ['X-Requested-With', 'XSRF-TOKEN', 'Authorization'],
  credentials: true,
};
