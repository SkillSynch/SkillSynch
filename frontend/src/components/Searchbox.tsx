import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addJob } from '../redux/store';
import { JobItem } from '../types';

export default function Searchbox() {
  const title = useRef<null | HTMLInputElement>(null);
  const location = useRef<null | HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSearchClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleValue = title.current!.value.replace(/\s/g, '%20');
    const locationValue = location.current!.value.replace(/\s/g, '%20');

    // Fetch the job ids
    const adzunaApi = `http://localhost:3000/getjobids?title=${titleValue}&location=${locationValue}`;

    const adzunaResponse = await fetch(adzunaApi);
    const jobIds = (await adzunaResponse.json()) as string[];

    // const openaiApi = 'http://localhost:3000/getJobDetails';

    // Put all the job ids in the queue
    for await (const jobId of jobIds) {
      // Fetch the job details
      const response = await fetch(
        `http://localhost:3000/getjobdetails?jobid=${jobId}`
      );

      // const jobItem = (await response.json()) as JobItem;

      // dummy jobItem to allow rendering on frontend
      // const jobItem: JobItem = {
      //   match: 1,
      //   title: jobId,
      //   company: 'test',
      //   location: 'test',
      //   salary: 'test',
      //   skills: [{skill: 'React', level: 'Junior'}],
      //   url: 'test',
      //   about: 'test',
      // };
      // call addJob to update state
      // dispatch(addJob(jobItem));
    }
  };

  return (
    <Box component="form" onSubmit={handleSearchClick} sx={{ marginY: '24px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={6} sm={4}>
          <TextField
            id="search-title"
            inputRef={title}
            label="Title"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            id="search-location"
            inputRef={location}
            label="Location"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            id="search-button"
            variant="outlined"
            size="large"
            fullWidth
            type="submit"
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
