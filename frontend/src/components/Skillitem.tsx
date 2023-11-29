import { Grid, Typography } from '@mui/material';
import React from 'react';

export type SkillitemProps = {
  skill: string;
  level: 'Junior' | 'Mid' | 'Senior';
};

const Skillitem: React.FC<SkillitemProps> = ({ skill, level }) => {
  return (
    <>
      <Grid item xs={6} sm={3}>
        <Typography variant="button">
          {skill}: {level}
        </Typography>
      </Grid>
    </>
  );
};

export default Skillitem;
