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

export type JobItem = {
  match: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
};

export default function JobsTable({ jobs }: { jobs: JobItem[] }) {
  return (
    // render jobs in a table
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Match</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.match}%</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
