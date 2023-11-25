import { Button, Grid, Stack, TextField } from "@mui/material";
import React from "react";

export default function Skillsbox() {
  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center' sx={{width: '100%', maxWidth: '960px', margin: 'auto'}}>
      <Grid item xs={6} sm={4}>
        <TextField id='skill-title' label='Skill' variant='outlined' size='small' fullWidth/>
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField id='skill-level' label='Level' variant='outlined' size='small' fullWidth />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button id='addskill-button' variant='outlined' size='large' fullWidth>Add Skill</Button>
      </Grid>
    </Grid>
  );
}
