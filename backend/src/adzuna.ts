<<<<<<< HEAD
require('dotenv').config();
const path = require('path');
import { parseAdzunaResponse } from "./adzunaParser";
import { fetchDescription } from "./adzunaFetch";
import pool from "./db/database";
=======
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
>>>>>>> 2d6e14a43f3639ef3c8408835f2ee38d91230582
import redisClient from '../redis/redisClient';
import { FrontEndFields, parseAdzunaResponse } from './adzunaParser';

dotenv.config();

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

      // see if query string and associated adzuna response already exists in redis
      const queryString = `${title}:${location}`;
      const cachedData: any = await redisClient.get(queryString);

      // if data is cached
      if (cachedData) {
        console.log('in cache');
        // parse cachedData from string
        const parsedResults = JSON.parse(cachedData);
        // grab ids from parsedResults and assign to res.locals.
        res.locals['jobIds'] = parsedResults.map((job: any) => job.id);

        // if data is not cached
      } else {
        console.log('not in cache');
        // get and parse data from adzuna
        const responses = await fetch(url);
        const data = await responses.json();
        const parsedResults = parseAdzunaResponse(data);
        // cache queryString/parsedResults combo in redis - combo to be removed from cache after 60 seconds
        redisClient.setEx(queryString, 600, JSON.stringify(parsedResults));
        // separately cache individual jobids
        parsedResults.forEach((job: FrontEndFields) => {
          const jobIdString = job.id.toString();
          redisClient.setEx(jobIdString, 600, JSON.stringify(job));
        });
        // grab ids from parsedResults and assign to res.locals.
        res.locals['jobIds'] = parsedResults.map((job: any) => job.id);
      }

      // return invocation of next
      return next();
    } catch (error) {
      next(res.status(500).json({ error: 'adzuna get request query error' }));
    }
  },

  async getUrls(req: Request, res: Response, next: NextFunction) {
    // const jobId = req.query.jobid as string;
    const jobIds = req.body.jobids as string[];

    const urls: string[] = []

    for await (const jobId of jobIds) {
      // look up jobId in redis
      const jobDetails = await redisClient.get(jobId.toString() || 'Missing Job ID');
      // console.log('jobdetails', jobDetails);
      if (jobDetails) {
        const obj = JSON.parse(jobDetails)
        // console.log('obj', obj)
        const url = obj.redirect_url
        console.log('url', url)
        if (url.startsWith('https://www.adzuna.com/details/')) {
          urls.push(url)
        }
      }
    }

    // if jobDetails is not in redis, return error
    if (!urls.length) {
      return next({
        status: 401,
        log: 'adzunaController.getUrls: ERROR: No valid job IDs',
        message: {
          err: 'adzunaController.getUrls: ERROR: No valid job IDs',
        },
      });
    }

    // if jobDetails is found, parse jobDetails and save url to res.locals
    // res.locals['urls'] = urls;
    res.locals.urls = urls

    return next();
  },
};

module.exports = adzunaController;