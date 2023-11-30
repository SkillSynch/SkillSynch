import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
require('dotenv').config()

import jobRoutes from './routes/jobRoutes'
import openaiRouter from './routes/openaiRoutes';

const apiKey = process.env.adzunaKey;
const apiID = process.env.adzunaID;
const apiURL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const resultsPerPage = 10;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/getMatches', openaiRouter);

app.get('/jobs', async (_req: Request, res: Response) => {
  try {
      // Extract parameters from the request query. Location doesn't seem to work (returns 400)
      const { title, location, salaryMin, fullTime, skills } = _req.query;

      // Construct the URL with additional parameters. Location doesn't seem to work (returns 400)
      const url = `${apiURL}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}&what=${title}`
      const response = await fetch(url)
      const data = await response.json();
      // console.log(data.results[0]);
      AI(data.results[0]);
      res.json(data);
  } catch (error) {
      res.status(500).json({error: 'adzuna get request query error'})
  }
});

// testing OpenAI

const OpenAI = require('openai');
require('dotenv').config()

// @ts-ignore
const openai = new OpenAI({ apiKey: process.env.openAIKey });

async function AI(job: any) {
  const completion = await openai.chat.completions.create({
    messages: [
      {role: 'system', content: 'You are a consultant designed to match users to jobs to output JSON.'},
      {role: 'user', content: `Given that I know typescript looking to make more than 150k located in Boston, how good of a match is ${JSON.stringify(job)} for me out of 100` }
    ],
    model: 'gpt-3.5-turbo-1106',
    response_format: { "type": "json_object" },
  });

  console.log(completion.choices[0].message.content);
}

//testing OpenAI

app.use('/test', (_req: Request, res: Response, _next: NextFunction) => {
  return res.send('test');
})

app.use('/', express.static(path.join(__dirname, '../dist')));

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

export default app;
