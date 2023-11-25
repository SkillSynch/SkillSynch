import { Grid, Paper } from '@mui/material';
import React from 'react';
import Skillitem, { SkillitemProps } from './Skillitem';

export default function SkillsDisplay() {
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
    <Paper sx={{ marginTop: '16px', marginBottom: '30px' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          padding: '24px',
        }}
      >
        {skills.map((skill, index) => (
          <Skillitem key={index} skill={skill.skill} level={skill.level} />
        ))}
      </Grid>
    </Paper>
  );
}
