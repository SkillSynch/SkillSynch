import { Grid, Typography } from '@mui/material';
import React from 'react';
import { SkillItem } from '../types'

const Skillitem: React.FC<SkillItem> = ({ skill, level }) => {
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
