import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import {
  closeBrowser,
  getJobDescription,
  getJobDescriptions,
  getJobHtml,
  setUrl,
} from '../playwright/playwright';
import redisClient from '../redis/redisClient';
require('dotenv').config();
const { Client } = require('pg');
const port = 3000;
const adzunaController = require('./adzuna'); // import adzunaController
import { summarizeDescription } from './openaiController';
import { FrontEndFields } from './adzunaParser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// const page = 1; including the page in the apiURL for the timebeing. Need to implement pagination
// ElephantSQL connection sstring (replace with credentials)
// const connectionString = process.env.DATABASE_URI;

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

app.get('/getjobids', adzunaController.getJobs, (req, res) => {
  console.log('ran getjobids');
  res.status(200).json(res.locals.jobIds);
});

app.post(
  '/getjobdetails',
  adzunaController.getUrls,
  getJobDescriptions,
  summarizeDescription,
  // getSkills,
  // getMatchPercentage,
  // combineResults,
  (req, res) => {
    const jobDetails = res.locals.jobDetails as FrontEndFields;
    const openai_response = res.locals.openai_response;
    jobDetails.skills = openai_response["techs"];
    jobDetails.salary_min = openai_response["estimatedSalary"][0][1];
    jobDetails.salary_max = openai_response["estimatedSalary"][0][2];
    const result = {
      match: 1,
      title: jobDetails.title,
      company: jobDetails.company,
      location: openai_response["estimatedSalary"][0][0],
      salary: jobDetails.salary_max,
      skills: jobDetails.skills.map((skill:any) => {return {skill: skill[0], level: skill[1]}}),
      url: jobDetails.redirect_url
    };

    // res.status(200).end();
    res.status(200).json(result);
  }
);

// testing endpoints
app.get('/jobs', adzunaController.getJobs, (req, res) => {
  res.status(200);
});

app.get('/getHtml', setUrl, getJobHtml, (req, res) => {
  console.log(res.locals.html);
  res.end();
});

app.get('/getdescription', setUrl, getJobDescription, summarizeDescription, (req, res) => {
  console.log(typeof(res.locals.description));
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

Promise.all([redisClient.connect()]).then(() => {
  app.listen(3000, () => {
    console.log('Server listening on port: 3000');
  });
});

// app.listen(3000, () => {
//   console.log('Server listening on port: 3000');
// });

// close the playwrighte browser on exit
process.on('exit', closeBrowser);
process.on('SIGINT', closeBrowser);
process.on('SIGTERM', closeBrowser);

export default app;