import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

export default function Skillsbox() {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ marginY: '24px' }}
    >
      <Grid item xs={6} sm={4}>
        <TextField
          id="skill-title"
          label="Skill"
          variant="standard"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          id="skill-level"
          label="Level"
          variant="standard"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          id="addskill-button"
          variant="contained"
          size="medium"
          fullWidth
        >
          Add Skill
        </Button>
      </Grid>
    </Grid>
  );
}
