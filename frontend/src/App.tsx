import React from 'react';
import { Box, Divider } from '@mui/material';
import Searchbox from './components/Searchbox';
import SkillsDisplay from './components/SkillsDisplay';

const App = () => {
  return (
    <Box>
      <Searchbox />
      <Divider />
      <SkillsDisplay />
      <Divider />
    </Box>
  )
};

export default App;
