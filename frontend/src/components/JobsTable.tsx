import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import levenshtein from 'levenshtein';

import { JobItem, SkillItem } from '../types';

import JobDetails from './JobDetails';

export default function JobsTable({
  jobs,
  skills,
}: {
  jobs: JobItem[];
  skills: SkillItem[];
}) {
  return (
    // render jobs in a table
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>Match</TableCell> */}
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Skills Matched</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job, index) => {
            const skillsMatched: string[] = [];

            // iterate through jobs.skills and calculate the highest strings match
            job.skills.forEach(skillItem => {
              // iterate through skills and calculate the highest strings match
              const jobSkillLowerCase = skillItem.skill.toLowerCase();
              const highestMatch = skills.reduce((acc, cur) => {
                const skillLowerCase = cur.skill.toLowerCase();
                const match = new levenshtein(skillLowerCase, jobSkillLowerCase)
                  .distance;

                const maxLength = Math.max(
                  jobSkillLowerCase.length,
                  skillLowerCase.length
                );
                const percent = (maxLength - match) / maxLength;

                if (percent > acc) {
                  return percent;
                }

                return acc;
              }, 0);

              // if match value > 90% then add to skills matched column
              if (highestMatch > 0.9) {
                skillsMatched.push(skillItem.skill);
              }
            });

            return (
              <TableRow key={index}>
                {/* <TableCell>{job.match}%</TableCell> */}
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{skillsMatched.join(', ')}</TableCell>
                <TableCell>
                  <JobDetails jobItem={job} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
