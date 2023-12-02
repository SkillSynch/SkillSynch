import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import {
  closeBrowser,
  getJobDescription,
  getJobHtml,
  setUrl,
} from '../playwright/playwright';
require('dotenv').config();
const { Client } = require('pg');
const port = 3000;
const adzunaController = require('./adzuna'); // import adzunaController

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const apiKey = process.env.adzunaKey;
const apiID = process.env.adzunaID;
const apiURL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const resultsPerPage = 10;
// const page = 1; including the page in the apiURL for the timebeing. Need to implement pagination
// ElephantSQL connection sstring (replace with credentials)
const connectionString = process.env.DATABASE_URI;

// serve static files from the dist directory
app.use('/', express.static(path.join(__dirname, '../dist')));

// // Create a PostgreSQL client
// const client = new Client({
//     connectionString: connectionString,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

// // Connect to database
// client.connect()
//     .then(() => {
//         console.log('Connected to the database');
//     })
//     .catch((err: { message: any; }) => {
//         console.log('Error connecting to the database: ', err.message)
//     })

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/src', 'index.html'));
// });

// app.use(express.static('../frontend/index.html'))

app.get('/getjobids', adzunaController.getJobs, (req, res) => {
  console.log('ran getjobids');
  res.status(200).json(res.locals.jobIds);
});

app.get('/getHtml', setUrl, getJobHtml, (req, res) => {
  console.log(res.locals.html);
  res.end();
});

app.get('/jobs', 
adzunaController.getJobs,

(req, res) => {
  res.status(200);
});

app.get('/getHtml', setUrl, getJobHtml, (req, res) => {
  console.log(res.locals.html);
  res.end();
});

app.get('/getdescription', setUrl, getJobDescription, (req, res) => {
  console.log(res.locals.description);
  res.end();
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message.err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});

// close the playwrighte browser on exit
process.on('exit', closeBrowser);
process.on('SIGINT', closeBrowser);
process.on('SIGTERM', closeBrowser);

export default app;
