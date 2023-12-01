import cookieParser from 'cookie-parser';
require('dotenv').config()
import cors from 'cors';
const { Client } = require('pg');
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src', 'index.html'));
});

app.use(express.static('../frontend/index.html'))

app.get('/jobs', adzunaController.getJobs, openAIController.parseJob, openAIController.postParsedJob, (req, res) => {
    res.status(200);
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

app.listen(port, () => {
  console.log('Server listening on port: 3000');
});

export default app;
