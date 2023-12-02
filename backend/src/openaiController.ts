import { Request, Response, NextFunction } from 'express';
<<<<<<< HEAD
import pool from './db/database';
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
=======
import pool from '../db/database';
const OpenAI = require('openai');
require('dotenv').config()
const openai = new OpenAI({ apiKey: process.env.openAIKey });

export async function summarizeDescription(req: Request, res: Response, next: NextFunction) {
    const descriptions = res.locals.descriptions as string[];
    
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: 'You are a technical recruiter design to output JSON.'},
        {role: 'user', content: `Given the following job description, please respond in the following JSON format {techs: [array of tuple with two elements, name of a single technology (do not combine multiple technologies, include only software technologies) and the estimated level of experience required (choose from junior, mid, senior)], estimatedSalary: array of tuples with three elements, the state of the location, the minimum estimated salary and the maximum estimated salary, level: choose between junior, mid, and senior}. If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }. Here is the job description: ${descriptions[0]}` } // need to get this job description from the database.
        // {role: 'user', content: `Given the following job description, please respond in the following JSON format {techs: [array of tuple with two elements, name of the tech and minimum years of experience required], estimatedSalary: array of tuples with three elements, the location, the minimum estimated salary and the maximum estimated salary, level: choose between junior, mid, and senior}. If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }. Here is the job description: ${description}` } // need to get this job description from the database.
      //   {role: 'user', content: `Given the following jobs and their descriptions, please respond in following JSON format:
      //   An array of objects with one object for each job description provided. Here's an example response with one job description
      //   [ 
      //     {
      //       techs: [
      //         array of tuple with two elements, 
      //           name of a single technology (do not combine multiple technologies, include only software technologies) 
      //           and the estimated level of experience required (choose from junior, mid, senior)], 
      //       estimatedSalary: [array of tuples with three elements, 
      //         the state of the location, 
      //         the minimum estimated salary and the maximum estimated salary], 
      //       level: choose between junior, mid, and senior
      //     }. 
      //   ]
      //   If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }.
      //   ${descriptions[0] ? `Here is the job description for job number 1: ${descriptions[0]}` : ''}
      //   ${descriptions[1] ? `Here is the job description for job number 1: ${descriptions[1]}` : ''}
      //   ${descriptions[2] ? `Here is the job description for job number 1: ${descriptions[2]}` : ''}
      //   ${descriptions[3] ? `Here is the job description for job number 1: ${descriptions[3]}` : ''}
      //   ${descriptions[4] ? `Here is the job description for job number 1: ${descriptions[4]}` : ''}
      //   `
      
      // } // need to get this job description from the database.
>>>>>>> 2d6e14a43f3639ef3c8408835f2ee38d91230582
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { "type": "json_object" },
    });
<<<<<<< HEAD
  
   const { job_id, posted, salary_start, salary_end, location, type_remote, level } = JSON.parse(completion.choices[0].message.content);
   console.log(job_id);
  }

export default openaiController;
=======
    console.log(completion.choices[0].message.content);
    return next();
  }

  // messages: [
  //   {role: 'system', content: 'You are a parsing tool that outputs to JSON'},
  //   {role: 'user', content: `Give the information in object ${job}, please give me summarized information in the form of: 
  //   job_id: job_id,
  //   posted: insert posted timestamp,
  //   salary_start: salary_min,
  //   salary_end: salary_max,
  //   location: location,
  //   type_remote: remote, onsite, or hybrid,
  //   level: level of seniority (junior, mid-level, or senior)
  //   ` }
  // ],

    //  const { job_id, posted, salary_start, salary_end, location, type_remote, level } = JSON.parse(completion.choices[0].message.content);
  //  console.log(job_id);

          // Here is the job description for job number 1: ${descriptions[0]}.
        // Here is the job description for job number 2: ${descriptions[1]}.
        // Here is the job description for job number 3: ${descriptions[2]}.
        // Here is the job description for job number 4: ${descriptions[3]}.
        // Here is the job description for job number 5: ${descriptions[4]}.
>>>>>>> 2d6e14a43f3639ef3c8408835f2ee38d91230582
