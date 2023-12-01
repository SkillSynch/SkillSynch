require('dotenv').config();
const path = require('path');
import { parseAdzunaResponse } from './adzunaParser';

const apiKey = process.env.adzunaKey;
const apiID = process.env.adzunaID;
const apiURL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const resultsPerPage = 10;
// const page = 1; including the page in the apiURL for the timebeing. Need to implement pagination

const adzunaController = {
  async getJobs(req: any, res: any, next: any) {
    try {
      // Extract parameters from the request query. Location doesn't seem to work (returns 400)
      // const { title, salaryMin, fullTime, skills } = req.query;
      const { title, location } = req.query;

      // Construct the URL with additional parameters. Location doesn't seem to work (returns 400)
      // const url = `${apiURL}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}&what=${title}&what_and=${skills}&salary_min=${salaryMin}&full_time=${fullTime}`

      const url = `${apiURL}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}&what=${title}&where=${location}`;

      const responses = await fetch(url);
      const data = await responses.json();
      const parsedResults = parseAdzunaResponse(data);

      // res.json(data);
      res.locals['jobIds'] = parsedResults.map((job: any) => job.id);

      next();
    } catch (error) {
      next(res.status(500).json({ error: 'adzuna get request query error' }));
    }
  },
};

module.exports = adzunaController;
