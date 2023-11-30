import { Grid, Paper } from '@mui/material';
import React from 'react';
import Skillitem from './Skillitem';
import { useSelector } from 'react-redux';
import { AppState } from '../types'; 

export default function SkillsDisplay() {
  // use useSelector to extract skills from the Redux store
  const skills = useSelector((state: AppState) => state.skills);

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
