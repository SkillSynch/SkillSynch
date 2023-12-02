import React, { useState } from 'react';
import { Button, Grid, TextField, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSkill } from '../redux/store'; 

export default function Skillsbox() {
  const dispatch = useDispatch();

  // local state to store the values of the Skill and Level text fields
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<'Junior' | 'Mid' | 'Senior'>('Junior');

  const handleAddSkill = (e: React.MouseEvent) => {
    e.preventDefault();
    // dispatch the addSkill action with the new skill
    dispatch(addSkill({ skill: newSkill, level: newLevel }));

    // reset text fields after adding the skill
    setNewSkill('');
    setNewLevel('Junior');
  };
  
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
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value as string)}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <Select
          id="skill-level"
          label="Level"
          variant="standard"
          size="small"
          fullWidth
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value as 'Junior' | 'Mid' | 'Senior')}
        >
          <MenuItem value='Junior'>Junior</MenuItem>
          <MenuItem value='Mid'>Mid</MenuItem>
          <MenuItem value='Senior'>Senior</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          id="addskill-button"
          variant="contained"
          size="medium"
          fullWidth
          onClick={handleAddSkill}
        >
          Add Skill
        </Button>
      </Grid>
    </Grid>
  );
}