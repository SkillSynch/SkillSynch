import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';

export default function Searchbox() {
  return (
    <Box sx={{ marginY: '24px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={6} sm={4}>
          <TextField
            id="search-title"
            label="Title"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="search-location"
            label="Location"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button id="search-button" variant="outlined" size="large" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
