import React from 'react';
import { Divider, Stack } from '@mui/material';
import Searchbox from './components/Searchbox';
import SkillsDisplay from './components/SkillsDisplay';
import Skillsbox from './components/Skillsbox';
import JobsTable, { JobItem } from './components/JobsTable';
import { SkillitemProps } from './components/Skillitem';

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
  // sample skills
  const skills: SkillitemProps[] = [
    { skill: 'Python', level: 'Senior' },
    { skill: 'React', level: 'Mid' },
    { skill: 'Django', level: 'Junior' },
    { skill: 'Flask', level: 'Junior' },
    { skill: 'Node.js', level: 'Mid' },
    { skill: 'Express', level: 'Mid' },
    { skill: 'MongoDB', level: 'Mid' },
    { skill: 'PostgreSQL', level: 'Mid' },
  ];

  return (
    <Stack
      direction="column"
      sx={{ width: '100%', maxWidth: '960px', margin: 'auto' }}
    >
      <Searchbox />
      <Divider />
      <Skillsbox />
      <SkillsDisplay skills={skills} />
      <Divider />
      <JobsTable jobs={jobs} />
    </Stack>
  );
};

export default App;
