import { Grid, Typography } from '@mui/material';
import React from 'react';

export type Skillitem = {
  skill: string;
  level: 'Junior' | 'Mid' | 'Senior';
};

const Skillitem: React.FC<Skillitem> = ({ skill, level }) => {
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
