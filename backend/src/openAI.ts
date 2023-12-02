import { Request, Response, NextFunction } from 'express';
import pool from './db/database';
const OpenAI = require('openai');
require('dotenv').config()
const openai = new OpenAI({ apiKey: process.env.openAIKey });

export async function openAI(job: Object) {
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
