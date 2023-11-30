import React from 'react';
import { Divider, Stack } from '@mui/material';
import Searchbox from './components/Searchbox';
import SkillsDisplay from './components/SkillsDisplay';
import Skillsbox from './components/Skillsbox';
import JobsTable from './components/JobsTable';
import { JobItem } from './types';

const App = () => {
  // create an example array of JobItems
  const jobs: JobItem[] = [
    {
      match: 50,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$150,000',
      skills: [
        { skill: 'React', level: 'Mid' },
        { skill: 'TypeScript', level: 'Mid' },
        { skill: 'Node.js', level: 'Mid' },
        { skill: 'MongoDB', level: 'Mid' },
      ],
      url: 'https://www.google.com',
      about:
        'Google is a multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.',
    },
    {
      match: 40,
      title: 'Software Engineer',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      salary: '$160,000',
      skills: [
        { skill: 'React', level: 'Mid' },
        { skill: 'TypeScript', level: 'Mid' },
        { skill: 'Node.js', level: 'Mid' },
        { skill: 'MongoDB', level: 'Mid' },
      ],
      url: 'https://www.facebook.com',
      about:
        'Facebook is an American online social media and social networking service owned by Facebook, Inc.',
    },
    {
      match: 30,
      title: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      salary: '$140,000',
      skills: [
        { skill: 'React', level: 'Mid' },
        { skill: 'TypeScript', level: 'Mid' },
        { skill: 'Node.js', level: 'Mid' },
        { skill: 'MongoDB', level: 'Mid' },
      ],
      url: 'https://www.amazon.com',
      about:
        'Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington, which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
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