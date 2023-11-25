import React from 'react';
import { Divider, Stack } from '@mui/material';
import Searchbox from './components/Searchbox';
import SkillsDisplay from './components/SkillsDisplay';
import Skillsbox from './components/Skillsbox';
import JobsTable, { JobItem } from './components/JobsTable';

const App = () => {
  // create an example array of JobItems
  const jobs: JobItem[] = [
    {
      match: 50,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$150,000',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      match: 40,
      title: 'Software Engineer',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      salary: '$160,000',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      match: 30,
      title: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      salary: '$140,000',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    },
  ];

  return (
    <Stack
      direction="column"
      sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}
    >
      <Searchbox />
      <Divider />
      <Skillsbox />
      <SkillsDisplay />
      <Divider />
      <JobsTable jobs={jobs} />
    </Stack>
  );
};

export default App;
