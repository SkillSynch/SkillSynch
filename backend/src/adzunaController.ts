require('dotenv').config()
const Job = require('../models/JobModel');
const description = require('./adzunaFetch.ts')

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
            res.json(data);
        } catch (error) {
            next(res.status(500).json({error: 'adzuna get request query error'}));
        }
    },
}

module.exports = adzunaController;
