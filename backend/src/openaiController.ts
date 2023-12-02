import { Request, Response, NextFunction } from 'express';
import pool from '../db/database';
const OpenAI = require('openai');
require('dotenv').config()
const openai = new OpenAI({ apiKey: process.env.openAIKey });

export async function summarizeDescription(req: Request, res: Response, next: NextFunction) {
    const description = res.locals.description as string;
    const completion = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: 'You are a technical recruiter design to output JSON.'},
        // {role: 'user', content: `Given the following job description, please respond in the following JSON format {techs: [array of tuple with two elements, name of the tech and minimum years of experience required], estimatedSalary: array of tuples with three elements, the location, the minimum estimated salary and the maximum estimated salary, level: choose between junior, mid, and senior}. If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }. Here is the job description: ${description}` } // need to get this job description from the database.
        {role: 'user', content: `Given the following job description, please respond in the following JSON format {techs: [array of tuple with two elements, name of a single technology (do not combine multiple technologies, include only software technologies) and the estimated level of experience required (choose from junior, mid, senior)], estimatedSalary: array of tuples with three elements, the state of the location, the minimum estimated salary and the maximum estimated salary, level: choose between junior, mid, and senior}. If you can not provide the response in the format described, return the following JSON object { message: "unable to parse" }. Here is the job description: ${'jobDescription'}` } // need to get this job description from the database.
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { "type": "json_object" },
    });
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