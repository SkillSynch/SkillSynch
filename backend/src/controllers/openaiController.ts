import { Request, Response, NextFunction } from 'express';
import pool from '../db/database';
const OpenAI = require('openai');
require('dotenv').config()

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
        console.log(res.locals.jobs);
        res.locals.jobs.forEach((job: Object) => {
            console.log(openAI(job));
        })
        
        res.send('in matches');
    }
}

async function openAI(job: Object) {
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: 'You are a tool designed to match user to jobs based on provided criteria to response in string'},
        {role: 'user', content: `If I'm looking for a software engineering job in the 150k to 180k range in Boston, am I a good match to ${job}? Score only` }
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { "type": "text" },
    });
  
    console.log(completion.choices[0].message.content);
  }

export default openaiController;