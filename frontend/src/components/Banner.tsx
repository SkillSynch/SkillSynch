import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Banner() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h4" sx={{margin: 'auto'}}>SkillSynch</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
