import React, { useState } from 'react';
import { Grid, Typography, Select, IconButton, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { updateSkill, deleteSkill } from '../redux/store';
import { SkillItem } from '../types'

const Skillitem: React.FC<SkillItem> = ({ skill, level }) => {
  const dispatch = useDispatch();

  // local state to keep track of editing mode and edited level value
  const [isEditing, setIsEditing] = useState(false);
  const [editedLevel, setEditedLevel] = useState(level);

  // toggle editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveSkill = () => {
    // dispatch the updateSkill action with the edited skill details
    dispatch(updateSkill({ skill, level: editedLevel }));
    // exit edit mode
    setIsEditing(false);
  };

  const handleDeleteSkill = () => {
    // dispatch the deleteSkill action with the skill name to delete
    dispatch(deleteSkill(skill));
  };

  return (
    <>
      <Grid item xs={12} sm={12} alignItems="center">
        {isEditing ? (
          <>
            <Typography variant="button">
              {skill}
            </Typography>
            <Select
              value={editedLevel}
              onChange={(e) => setEditedLevel(e.target.value as 'Junior' | 'Mid' | 'Senior')}
              label="Level"
              variant="outlined"
              size="small"
            >
              <MenuItem value="Junior">Junior</MenuItem>
              <MenuItem value="Mid">Mid</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
            <IconButton aria-label="save" onClick={handleSaveSkill}>
              <SaveIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="button">
              {skill}: {level}
            </Typography>
            <IconButton aria-label="edit" onClick={handleEditToggle}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={handleDeleteSkill}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Grid>
    </>
  );
};

export default Skillitem;