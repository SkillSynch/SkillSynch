require('dotenv').config()
const path = require('path');
import { parseAdzunaResponse } from "./adzunaParser";
import { fetchDescription } from "./adzunaFetch";
import pool from "./db/database";

const apiKey = process.env.adzunaKey;
const apiID = process.env.adzunaID;
const apiURL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';
const resultsPerPage = 10;
// const page = 1; including the page in the apiURL for the timebeing. Need to implement pagination

const adzunaController = {

    async getJobs(req: any, res: any, next: any) {
        try {
            // Extract parameters from the request query. Location doesn't seem to work (returns 400)
            const { title, salaryMin, fullTime, skills } = req.query;

            // Construct the URL with additional parameters. Location doesn't seem to work (returns 400)
            const url = `${apiURL}?app_id=${apiID}&app_key=${apiKey}&results_per_page=${resultsPerPage}&what=${title}&what_and=${skills}&salary_min=${salaryMin}&full_time=${fullTime}`

            const responses = await fetch(url)
            const data = await responses.json();
            const jobs = await parseAdzunaResponse(data);
            const query = 'INSERT INTO job_postings(job_id, posted, salary_start, salary_end, location, type_remote, level) VALUES'
            const description = await fetchDescription(jobs[0].redirect_url)
            // jobs.forEach(async (job) => {
            //     console.log(job.redirect_url);
            //     const description = await fetchDescription(job.redirect_url);
            //     console.log(description);
            // })
            res.json(data);
        } catch (error) {
            next(res.status(500).json({error: 'adzuna get request query error'}));
        }
    }
}

module.exports = adzunaController;
