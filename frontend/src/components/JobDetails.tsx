import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Stack, Divider, Button, Popover } from '@mui/material';

import { JobItem } from '../types';

export default function JobDetails({ jobItem }: { jobItem: JobItem }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
        Details
      </Button>

      <Popover
        id={id}
        open={open}
        anchorReference="none"
        onClose={handleClose}
        sx={{
          maxWidth: '960px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2} sx={{ padding: '24px' }}>
          <Typography variant="h6">
            {jobItem.title} | {jobItem.match}%
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {jobItem.company}
            </Typography>
            <Typography variant="body1">{jobItem.location}</Typography>
          </Stack>
          <Typography variant="body1">{jobItem.salary}</Typography>
          <Divider />
          <Stack direction={'column'} spacing={2}>
            {jobItem.skills.map(skill => (
              <Typography key={skill.skill} variant="button">
                {skill.skill}: {skill.level}
              </Typography>
            ))}
          </Stack>
          <Divider />
          <Typography variant="body1">{jobItem.about}</Typography>
          <Typography variant="button" sx={{ fontSize: 'large' }}>
            Apply <Link to={jobItem.url}>{jobItem.url}</Link>
          </Typography>
        </Stack>
      </Popover>
    </div>
  );
}
