import { Request, Response, NextFunction } from 'express';
import pool from '../db/database';
const OpenAI = require('openai');
require('dotenv').config()

const testJob: Object = {"description": "Passionate people create exceptional things Did you know that the solutions we develop are a key part of most industries? Electronics, medical research, renewable energy, food production, infrastructure and many more. We´re everywhere Working with us means working with the latest technologies and groundbreaking, sustainable innovations. With our inclusive and caring environment, you get the support and inspiration you need to grow. Here, your ideas are embraced, and you never stop learning. Int…",
"adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiSkZWQjRDdVA3aEdqUjAzMzRmN3l1USIsImkiOiI0NDM1ODA4NDMzIn0.3J5hD_ddAncx0Fu9Cyb_Co6MXpKs2tKw-1wOcbJ9CYM",
"salary_min": 71230.71,
"salary_is_predicted": "1",
"__CLASS__": "Adzuna::API::Response::Job",
"id": "4435808433",
"title": "Undefined",
"category": {
    "label": "Engineering Jobs",
    "__CLASS__": "Adzuna::API::Response::Category",
    "tag": "engineering-jobs"
},
"created": "2023-11-16T04:41:26Z",
"latitude": 41.8834,
"location": {
    "__CLASS__": "Adzuna::API::Response::Location",
    "area": [
        "US",
        "Illinois",
        "Cook County",
        "Chicago",
        "The Loop"
    ],
    "display_name": "The Loop, Chicago"
},
"salary_max": 71230.71,
"redirect_url": "https://www.adzuna.com/details/4435808433?utm_medium=api&utm_source=5e7a40f2",
"company": {
    "__CLASS__": "Adzuna::API::Response::Company",
    "display_name": "Atlas Copco Drilling Solutions"
},
"longitude": -87.6271
}
// @ts-ignore
const openai = new OpenAI({ apiKey: process.env.openAIKey });

const openaiController = {
    async getJobs (req: Request, res: Response, next: NextFunction) {
        try {
            const getJobsQuery = 'SELECT * FROM job_postings';
            const result = await pool.query(getJobsQuery);
            res.locals.jobs = result.rows;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },

    async getMatches (req: Request, res: Response, next: NextFunction) {
        console.log(testJob);
        res.locals.jobs.forEach((job: Object) => {
            console.log(openAI(JSON.stringify(testJob)));
        })
        
        res.send('in matches');
    }
}

async function openAI(job: Object) {
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: 'You are a parsing tool that outputs to JSON'},
        {role: 'user', content: `Give the information in object ${job}, please give me summarized information in the form of: 
        job_id: job_id,
        posted: insert posted timestamp,
        salary_start: salary_min,
        salary_end: salary_max,
        location: location,
        type_remote: remote, onsite, or hybrid,
        level: level of seniority (junior, mid-level, or senior)
        ` }
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { "type": "json_object" },
    });
  
   const { job_id, posted, salary_start, salary_end, location, type_remote, level } = JSON.parse(completion.choices[0].message.content);
   console.log(job_id);
  }

export default openaiController;