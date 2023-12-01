import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
const port = 3000;
const adzunaController = require('./adzuna'); // import adzunaController
import openaiRouter from './routes/openaiRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/getMatches', openaiRouter);

const apiKey = process.env.adzunaKey;
const apiID = process.env.adzunaID;
const apiURL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const resultsPerPage = 10;
// const page = 1; including the page in the apiURL for the timebeing. Need to implement pagination
// ElephantSQL connection sstring (replace with credentials)
const connectionString = process.env.DATABASE_URI;

// serve static files from the dist directory
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
